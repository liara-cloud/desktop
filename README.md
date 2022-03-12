<div align="center">
  <a href="https://liara.ir" target="blank">
    <div>
      <img src="https://raw.githubusercontent.com/liara-cloud/desktop/master/assets/icon.png" width="160" height="160" alt="Nest Logo" />
    </div>
  </a>
      <b>The desktop interface for Liara</b>
</div>

## Contents

- [Development](#development)
- [Build](#build)
- [Release](#release)

## Development

To clone and run this repository you'll need to have [Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com) installed on your machine.
From your command line:

```bash
# Clone this repository
git clone https://github.com/liara-cloud/desktop.git

# Go into the repository
cd desktop
```

Now you need to install dependencies with [`npm`](https://npmjs.com):

```bash
npm install
```

Then start the app:

```bash
npm run prod
```

## Build

Run the following command:

```bash
npm run builder
```

To build the app for specific platfrom navigate to package.json and find out builder script, need to add some build configuration to tell electron-builder how to build application. Read [`electron-builder`](https://www.electron.build/) docs.

## Release

Ensure you have defined the following environment variables:

```bash
export AWS_ENDPOINT = 'ENTER YOUR S3 ENDPOINT';
export AWS_ACCESS_KEY_ID= 'ENTER YOUR S3 ACCESS KEY';
export AWS_SECRET_ACCESS_KEY= 'ENTER YOUR S3 SECRET KEY';
```

Now you need to run the following command to publish the already built app:

```bash
npm run deploy
``` 

By default new releases will be stored in the release directory.
It's possible to change the output directory in [electron-builder.yml](https://www.electron.build/configuration/configuration.html#MetadataDirectories) file.

**Note:**

Following the instructions below will compress your final build app as a `zip` file.

You will need to have [`mc`](https://docs.min.io/docs/minio-client-complete-guide.html) installed on your machine and set your [`alias`](https://docs.min.io/docs/minio-client-complete-guide.html#alias) too.

Next step  need to make the file *`deploy.sh`* executable with 
```bash
chmod +X deploy.sh
```

Ensure you have defined the following environment variable:
```bash
export MINIO_TARGET = 'ENTER YOUR MINIO TARGET';
```

Then call the script: 
```bash
./deploy.sh
```