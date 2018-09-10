import axios from 'axios';
import { remote, IpcRenderer } from 'electron';
import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import AddIcon from '@material-ui/icons/Add';
import EmptyStateIcon from '@material-ui/icons/PlaylistAdd';

import TitleBar from '../components/TitleBar';
import DropZone from '../components/DropZone';
import { Typography } from '@material-ui/core';

const styles = () => ({
  wrapper: {
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1b2129'
  },
  span: {
    color: 'white',
    fontSize: 15,
    padding: '0 6px',
    whiteSpace: 'nowrap',
    backgroundColor: 'rgb(11, 108, 176)',
  },
  ltr: {
    direction: 'rtl',
    textAlign: 'right'
  },
});

class Start extends Component {
  state = {
    dropZone: false,
    showDialog: false,
    showSpinner: false,
    dialogMessage: '',
    dialogOptions: {},

    // currentStep: 'drop',
    currentStep: 'deployment-type',

    projects: [],
    form: {},
    deploymentType: null,
    showCreateProjectDialog: false,
  }

  baseURL = 'http://localhost:3000';

  async componentDidMount() {
    this.requireNodeModules();

    const liaraConfPath = this.path.join(this.os.homedir(), '.liara.json');

    this.config = await this.fs.readJSON(liaraConfPath);

    this.APIConfig = {
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.config.api_token}`,
      }
    };
  }

  requireNodeModules() {
    this.fs = remote.require('fs-extra');
    this.os = remote.require('os');
    this.path = remote.require('path');
    this.startDeployment = remote.require('./deploy');
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
    if(list.length > 1) {
      this.dialog('امکان مستقر کردن چند پوشه نیست. لطفا یک پوشه انتخاب کنید.');
      return;
    }

    const isDirectory = (await this.fs.stat(list[0])).isDirectory();
    if( ! isDirectory) {
      this.dialog('لطفا پوشه‌ای را که حاوی پروژه‌ی‌تان است به این پنجره درگ کنید.', {
        details: 'فقط یک «پوشه» را می‌توانید در این قسمت درگ کنید.'
      });
      return;
    }

    this.projectPath = list[0];
    const liaraJSONPath = this.path.join(this.projectPath, 'liara.json');
    const hasLiaraJSONFile = this.fs.existsSync(liaraJSONPath);

    // Step 1) Read liara.json
    if(hasLiaraJSONFile) {
      try {
        this.liaraJSON = await this.fs.readJSON(liaraJSONPath) || {};
      } catch (error) {
        console.error(error);
        this.dialog('فایل `liara.json` دارای یک مشکل نگارشی است.', {
          details: 'لطفا توجه کنید که فایل `liara.json` خطای Syntax نداشته‌باشد.',
        });
        return;
      }

      this.projectId = this.liaraJSON.project;

      if (this.liaraJSON.port) {
        this.port = Number(this.liaraJSON.port);

        if (isNaN(this.port)) {
          this.dialog('فیلد `port` در فایل liara.json باید عددی باشد.');
          return;
        }
      }

      this.platform = this.liaraJSON.platform;
      if (this.platform && typeof this.platform !== 'string') {
        this.dialog('فیلد `port` در فایل liara.json باید رشته‌ای (String) باشد.');
        return;
      }
    }

    this.showSpinner();

    // Step 2) Choose a project or create one:
    if ( ! this.projectId) {
      // TODO: Handle errors
      await this.getProjects();

      this.setState({ currentStep: 'choose-project' });

      this.hideSpinner();

      return;
    }

    // Final step:
    console.log('Deploy:', list);
    // this.startDeployment({
    //   projectPath: this.projectPath,
    //   projectId: this.projectId 
    // });
  }

  async getProjects() {
    this.setState({ projectsLoading: true });
    const { data: { projects } } = await axios.get('/v1/projects', this.APIConfig);
    this.setState({ projects, projectsLoading: false });
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

  toggleCreateProjectDialog = () => {
    this.setState({
      showCreateProjectDialog: ! this.state.showCreateProjectDialog,
    });
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  }

  handleCreateProjectFormSubmit = async e => {
    e.preventDefault();

    const { form } = this.state;
    const regexErrorMessage = 'شناسه‌ی پروژه باید شامل اعداد، حروف انگلیسی و خط تیره باشد.';

    if( ! form.projectId) {
      return this.setState({
        errors: { projectId: 'وارد کردن این فیلد الزامی است.' }
      });
    }

    if( ! /^[a-zA-Z0-9][a-zA-Z0-9\-]+[a-zA-Z0-9]$/.test(form.projectId)) {
      return this.setState({
        errors: { projectId: regexErrorMessage }
      });
    }

    this.setState({ errors: {} });

    try {
      await axios.post('/v1/projects', form, this.APIConfig);

      this.setState({
        from: {},
        errors: {},
        showCreateProjectDialog: false,
      });

      this.getProjects();

    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        const messages = {
          400: regexErrorMessage,
          409: 'متاسفانه این شناسه‌ی پروژه قبلا گرفته شده است.'
        };

        return this.setState({
          errors: { projectId: messages[status] }
        });
      }

      console.error(error);
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'متاسفانه عملیات ناموفق بود. لطفا دوباره امتحان کنید.'
      });
    }
  }

  handleChoosedProject = () => {
    this.setState({ currentStep: 'deployment-type' });

    // try {
    //   this.startDeployment({
    //     projectPath: this.projectPath,
    //     projectId: choosedProject,
    //     platform: this.platform,
    //     port: this.port,
    //   });

    //   IpcRenderer.on('deployment:building-started', () => {
    //     //
    //   });

    //   IpcRenderer.on('deployment:building-finished', () => {
    //     //
    //   });

    //   IpcRenderer.on('deployment:creating-service', () => {
    //     //
    //   });

    //   IpcRenderer.on('deployment:ready', () => {
    //     //
    //   });

    //   IpcRenderer.on('deployment:failed', () => {
    //     // handle failure
    //   });

    //   IpcRenderer.on('deployment:log', () => {
    //     // handle failure
    //   });
    // }
    // catch (err) {
    //   console.error(err);
    // }
  }

  chooseDeploymentType = type => {
    this.setState({ deploymentType: type });
  }

  render() {
    const { classes } = this.props;
    const {
      dropZone,
      showDialog,
      dialogMessage,
      dialogOptions,
      currentStep,
      projects,
      errors = {}
    } = this.state;
    return (
      <div className={classes.wrapper}>
        <TitleBar />

        <Dialog open={showDialog} onClose={this.closeDialog}>
          <DialogTitle>
            {dialogMessage}
          </DialogTitle>

          {dialogOptions.details && (
            <DialogContent style={{ color: '#dedede' }}>  
              {dialogOptions.details}
            </DialogContent>
          )}

          <DialogActions>
            <Button onClick={this.closeDialog}>
              بسیار خب.
            </Button>
          </DialogActions>
        </Dialog>

        {currentStep === 'drop' && (
          <DropZone
            style={{ flex: 1, borderColor: dropZone ? 'green' : undefined }}
            onDragEnter={this.showDropZone}
            onDragLeave={this.hideDropZone}
            onDragOver={this.preventDefault}
            onDrop={this.droppedFile}
            onBrowse={this.onBrowse}
            isLoading={this.state.showSpinner}
          />
        )}

        {currentStep === 'choose-project' && (
          <Fragment>
            {projects.length > 0 && (
              <Fragment>
                <div style={{ maxHeight: 420, overflowY: 'auto', margin: 32 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      لطفا یکی از پروژه‌های‌تان را انتخاب کنید:
                      <Button
                        color="secondary"
                        onClick={this.toggleCreateProjectDialog}
                      >
                        <AddIcon />
                        ایجاد پروژه‌ی جدید
                      </Button>
                    </FormLabel>
                    <RadioGroup
                      name="choosedProject"
                      value={this.state.form.choosedProject}
                      onChange={this.handleChange}
                    >
                      {projects.map(project => (
                        <FormControlLabel
                          key={project._id}
                          control={<Radio />}
                          value={project.project_id}
                          label={project.project_id}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <div style={{ padding: '0 32px 28px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.handleChoosedProject}
                    disabled={ ! this.state.form.choosedProject}
                  >
                    مرحله‌ی بعد
                    <LeftArrow />
                  </Button>
                </div>
              </Fragment>
            )}

            {projects.length === 0 && (
              <div
                style={{
                  paddingTop: 42,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <EmptyStateIcon style={{ fontSize: 46, color: '#717171' }} />
                <h3>شما تا الان هیچ پروژه‌ای ایجاد نکرده‌اید.</h3>
                <Button
                  color="secondary"
                  variant="raised"
                  style={{ marginTop: 16 }}
                  onClick={this.toggleCreateProjectDialog}
                >
                  <AddIcon />
                  ایجاد پروژه‌ی جدید
                </Button>
              </div>
            )}
          </Fragment>
        )}

        {currentStep === 'deployment-type' && (
          <Fragment>
            <div style={{ marginRight: 32 }}>
              <h3>نوع پروژه:</h3>
              <Typography variant="caption">
                پروژه‌ی شما با کدام‌یک از تکنولوژی‌های زیر ساخته شده‌است؟
              </Typography>
            </div>
            <div style={{ margin: 32, display: 'flex', justifyContent: 'center' }}>
              <DeploymentType
                active={this.state.deploymentType === 'laravel'}
                onClick={this.chooseDeploymentType.bind(this, 'laravel')}
              >
                <img src="/static/logos/laravel2.png" width="60" />
              </DeploymentType>
              <DeploymentType
                active={this.state.deploymentType === 'docker'}
                onClick={this.chooseDeploymentType.bind(this, 'docker')}
              >
                <img src="/static/logos/docker.png" width="70" />
              </DeploymentType>
              <DeploymentType
                active={this.state.deploymentType === 'nodejs'}
                onClick={this.chooseDeploymentType.bind(this, 'nodejs')}
              >
                <img src="/static/logos/nodejs.png" width="70" />
              </DeploymentType>
              <DeploymentType
                active={this.state.deploymentType === 'php'}
                onClick={this.chooseDeploymentType.bind(this, 'php')}
              >
                <img src="/static/logos/php.png" width="60" />
              </DeploymentType>
              <DeploymentType
                active={this.state.deploymentType === 'react'}
                onClick={this.chooseDeploymentType.bind(this, 'react')}
              >
                <img src="/static/logos/react.svg" width="70" />
              </DeploymentType>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Button
                variant="raised"
                color="secondary"
                onClick={this.handleDeploymentTypeSubmit}
                disabled={ ! this.state.deploymentType}
              >
                ثبت و ادامه
                <LeftArrow />
              </Button>
            </div>
          </Fragment>
        )}

        <Dialog open={this.state.showCreateProjectDialog} onClose={this.toggleCreateProjectDialog}>
          <form onSubmit={this.handleCreateProjectFormSubmit}>
            <DialogTitle>افزودن پروژه جدید</DialogTitle>
            <DialogContent>
              <DialogContentText>
                هر پروژه باید شناسه‌ای یکتا داشته باشد. شناسه‌ی پروژه، همان
                {' '}
                <span className={classes.span}>Sub domain</span>
                {' '}
                پروژه‌ی‌تان خواهد که از طریق آن می‌توانید به پروژه دسترسی داشته باشید.
              </DialogContentText>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="projectId"
                label="شناسه‌ی پروژه"
                placeholder="my-project"
                onChange={this.handleChange}
                value={this.state.form.projectId || ''}
                InputProps={{ classes: { input: classes.ltr } }}
                error={errors.projectId && true}
                helperText={errors.projectId}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleCreateProjectDialog}>
                {'انصراف'}
              </Button>
              <Button type="submit" color="secondary" variant="raised">
                {'افزودن پروژه'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}

function DeploymentType({ active, style, ...props }) {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        padding: 6,
        marginRight: 10,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderBottom: active ? '3px solid #109bfc' : 'none',
        ...style
      }}
      {...props}
    />
  );
}

export default withStyles(styles)(Start);