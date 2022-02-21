<div align="center">
  <a href="https://liara.ir" target="blank">
    <div>
      <img src="https://raw.githubusercontent.com/liara-cloud/desktop/master/assets/icon.png" width="160" height="160" alt="Nest Logo" />
    </div>
  </a>
      <b>The desktop app interface for Liara</b>
</div>

## Contents

- [How to run app](#how-to-run-app)
- [How to build app](#how-to-build-app)
- [How to publish the updates](#how-to-publish-the-updates)

## How to run app

To download the different version of this app and take it without having to build it locally, use this [download link](https://liara.ir). To clone and run this repository you'll need [Node.js](https://nodejs.org/en/download/) which comes with [npm](http://npmjs.com) and [Git](https://git-scm.com).
From your command line:

```bash
# Clone this repository
git clone https://github.com/liara-cloud/desktop.git <DestinationDirectory>

# Go into the repository
cd <DestinationDirectory>
```

Next step, you need to install dependencies with [`npm`](https://npmjs.comg):

```bash
npm install
```

Then start the app:

```bash
npm run prod
```

## How to build app
Building an app on three platforms.
We'll be using electron-builder since it has built-in support for Auto Update etc.

```bash
npm run builder
```

to build the app for specific platfrom navigate to package.json and find out builder script, need to add some build configuration to tell electron-builder how to build application.read [`electron-builder`](https://www.electron.build/) docs.

## How to publish the updates
Build the application once don't have to wait for a build every time.
To do this start with [how to build](#how-to-build-app) first.
Then ensure three below environment vaiables are set:

```bash
export AWS_ENDPOINT = 'ENTER YOUR S3 ENDPOINT'
export AWS_ACCESS_KEY_ID= 'ENTER YOUR S3 ACCESS KEY';
export AWS_SECRET_ACCESS_KEY= 'ENTER YOUR S3 SECRET KEY';
```

After you've set the env variables you can run publish command.

```bash
npm run deploy
``` 

By default new releases store in release directory
It's possible to change output directory in [electron-builder.yml](https://www.electron.build/configuration/configuration.html#MetadataDirectories) file
