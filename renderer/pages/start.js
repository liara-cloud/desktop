import { remote } from 'electron';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import TitleBar from '../components/TitleBar';
import DropZone from '../components/DropZone';

const styles = () => ({
  wrapper: {
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1b2129'
  }
});

class Start extends Component {
  state = {
    dropZone: false,
    showDialog: false,
    showSpinner: false,
    dialogMessage: '',
    dialogOptions: {},
  }

  showDropZone = () => {
    this.setState({ dropZone: true });
  }

  hideDropZone = () => {
    this.setState({ dropZone: false });
  }

  preventDefault(event) {
    // Make the cursor look good
    event.dataTransfer.effectAllowed = 'copyMove';
    event.dataTransfer.dropEffect = 'copy';

    event.preventDefault();
  }

  droppedFile = event => {
    this.hideDropZone();

    if (!event.dataTransfer || !event.dataTransfer.files) {
      return
    }

    // Prevent the window from loading the file inside it
    event.preventDefault();

    const { files } = event.dataTransfer;
    const list = [...files].map(file => file.path);

    // Shoot them into the cloud
    this.deploy(list);
  }

  async deploy(list) {
    const fs = remote.require('fs-extra');
    const deploy = remote.require('./deploy');
    const path = remote.require('path');
    const os = remote.require('os');
    const project = remote.require('./api/project');

    if(list.length > 1) {
      this.dialog('امکان مستقر کردن چند پوشه نیست. لطفا یک پوشه انتخاب کنید.');
      return;
    }

    const isDirectory = (await fs.stat(list[0])).isDirectory();
    if( ! isDirectory) {
      this.dialog('لطفا پوشه‌ای را که حاوی پروژه‌ی‌تان است به این پنجره درگ کنید.', {
        details: 'فقط یک «پوشه» را می‌توانید در این قسمت درگ کنید.'
      });
      return;
    }

    const projectPath = list[0];
    const liaraJSONPath = path.join(projectPath, 'liara.json');
    const hasLiaraJSONFile = fs.existsSync(liaraJSONPath);
    const liaraConfPath = path.join(os.homedir(), '.liara.json');

    let port;
    let platform;
    let projectId;

    const config = await fs.readJSON(liaraConfPath);
    const APIConfig = {
      baseUrl: 'http://localhost:3000/api',
      headers: {
        Authorization: `Bearer ${config.api_token}`,
      }
    };

    // Step 1) Read liara.json
    if(hasLiaraJSONFile) {
      let liaraJSON;

      try {
        liaraJSON = await fs.readJSON(liaraJSONPath) || {};
      } catch (error) {
        console.error(error);
        this.dialog('فایل `liara.json` دارای یک مشکل نگارشی است.', {
          details: 'لطفا توجه کنید که فایل `liara.json` خطای Syntax نداشته‌باشد.',
        });
        return;
      }

      projectId = liaraJSON.project;

      if (liaraJSON.port) {
        port = Number(liaraJSON.port);

        if (isNaN(port)) {
          this.dialog('فیلد `port` در فایل liara.json باید عددی باشد.');
          return;
        }
      }

      platform = liaraJSON.platform;
      if (platform && typeof platform !== 'string') {
        this.dialog('فیلد `port` در فایل liara.json باید رشته‌ای (String) باشد.');
      }
    }

    this.showSpinner();

    // Step 2) Choose a project or create one:
    if ( ! projectId) {
      const { data: { projects } } = await project.getAll(APIConfig);
      console.log(projects);
      return;
      // get projects
      // has any projects? then show a list to choose from.
      // doesn't have any projects? so show a form to create a project
    }

    // Final step:
    console.log('Deploy:', list);
    // deploy(list);
  }

  showSpinner() {
    this.setState({ showSpinner: true });
  }

  hideSpinner() {
    this.setState({ showSpinner: false });
  }

  dialog(message, options = {}) {
    this.setState({
      showDialog: true,
      dialogMessage: message,
      dialogOptions: options,
    });
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
      dialogMessage: '',
      dialogOptions: {},
    });
  }

  render() {
    const { classes } = this.props;
    const { dropZone, showDialog, dialogMessage, dialogOptions } = this.state;
    return (
      <div className={classes.wrapper}>
        <TitleBar />

        <Dialog open={showDialog} onClose={this.closeDialog}>
          <DialogTitle>
            {dialogMessage}
          </DialogTitle>

          {dialogOptions.details && (
            <DialogContent style={{ color: '#444' }}>  
              {dialogOptions.details}
            </DialogContent>
          )}
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
              بسیار خب.
            </Button>
          </DialogActions>
        </Dialog>

        <DropZone
          style={{ flex: 1, borderColor: dropZone ? 'green' : undefined }}
          onDragEnter={this.showDropZone}
          onDragLeave={this.hideDropZone}
          onDragOver={this.preventDefault}
          onDrop={this.droppedFile}
          isLoading={this.state.showSpinner}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Start);