const os = require('os');
const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');
const stream = require('stream');
const retry = require('async-retry');

const { getMainWindow } = require('./index');
const getFiles = require('./util/get-files');
const getPort = require('./util/get-port');
const ensureAppHasDockerfile = require('./util/ensure-has-dockerfile');

const baseURL = 'http://localhost:3000';

async function deploy({ projectPath, projectId, platform, port }) {
  const mainWindow = getMainWindow();

  const liaraConfPath = path.join(os.homedir(), '.liara.json');

  const config = await fs.readJSON(liaraConfPath);

  const APIConfig = {
    baseURL,
    headers: {
      Authorization: `Bearer ${config.api_token}`,
    }
  };

  const { files, directories, mapHashesToFiles } = await getFiles(projectPath);

  // const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  const { filesWithDockerfile, mapHashesToFilesWithDockerfile } =
    ensureAppHasDockerfile(platform, files, mapHashesToFiles);

  if ( ! port) {
    port = getPort(platform);
  }

  await retry(async bail => {
    try {
      const body = {
        port,
        directories,
        type: platform,
        project: projectId,
        files: filesWithDockerfile,
      };

      const url = `/v1/projects/${projectId}/releases`;

      const { data: stream } = await axios.post(url, body, {
        ...APIConfig,
        responseType: 'stream'
      });

      mainWindow.webContents.send('deployment:building-started');

      stream
          .on('data', data => {
            const line = JSON.parse(data.toString().slice(6));

            console.log(line);

            if (line.state === 'BUILD_FINISHED') {
              mainWindow.webContents.send('deployment:building-finished');
              return;
            }

            if (line.state === 'CREATING_SERVICE') {
              mainWindow.webContents.send('deployment:creating-service');
              return;
            }

            if (line.state === 'FAILED') {
              mainWindow.webContents.send('deployment:failed');
              return;
            }

            if (line.state === 'READY') {
              mainWindow.webContents.send('deployment:ready');
              return;
            }

            if(line.message) {
              mainWindow.webContents.send('deployment:log', {
                message: line.message.trim()
              });
            }
          })
          .on('end', () => {
            // debug && console.log('Stream finished.');
            // debug && console.timeEnd('stream');
          });

    } catch (error) {
      const { response } = error;

      // Unknown error
      if (!response) return bail(error);

      const data = await new Promise(resolve =>
        error.response.data.on('data', data => resolve(JSON.parse(data)))
      );

      if (response.status === 400 && data.message === 'missing_files') {
        const { missing_files } = data;

        console.log(`[debug] missing files: ${missing_files.length}`);

        mainWindow.webContents.send('deployment:uploading');

        await uploadMissingFiles(
          mapHashesToFilesWithDockerfile,
          missing_files,
          config,
        );

        mainWindow.webContents.send('deployment:upload-finished');

        throw error; // retry deployment
      }

      if (response.status >= 400 && response.status < 500) {
        return bail(error);
      }
    }
  }, {
    onRetry() {
      console.log('[debug] Retrying deployment...');
    }
  });
}

function uploadMissingFiles(mapHashesToFiles, missing_files, config) {
  return new Promise.all(missing_files.map(file => {
    const { data } = mapHashesToFiles.get(file);

    const dataStream = new stream.PassThrough();
    dataStream.end(data);

    return axios({
      baseURL,
      method: 'post',
      url: '/v1/files',
      data: dataStream,
      headers: {
        'X-File-Digest': file,
        'Content-Type': 'application/octet-stream',
        Authorization: `Bearer ${config.api_token}`,
      },
    });
  }));
}

module.exports = deploy;