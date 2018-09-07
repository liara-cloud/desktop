import axios from 'axios';
import { remote } from 'electron';
import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import TitleBar from '../components/TitleBar';
import DropZone from '../components/DropZone';
import { TextField } from '@material-ui/core';

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
    currentStep: 'drop',
    projects: [],
    form: {},
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
    const deploy = remote.require('./deploy');

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

    const projectPath = list[0];
    const liaraJSONPath = this.path.join(projectPath, 'liara.json');
    const hasLiaraJSONFile = this.fs.existsSync(liaraJSONPath);

    let port;
    let platform;
    let projectId;

    // Step 1) Read liara.json
    if(hasLiaraJSONFile) {
      let liaraJSON;

      try {
        liaraJSON = await this.fs.readJSON(liaraJSONPath) || {};
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
      // TODO: Handle errors
      await this.getProjects();

      this.setState({ currentStep: 'choose-project' });

      this.hideSpinner();

      return;
    }

    // Final step:
    console.log('Deploy:', list);
    // deploy(list);
  }

  async getProjects() {
    const { data: { projects } } = await axios.get('/v1/projects', this.APIConfig);
    this.setState({ projects });
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

    if( ! form.projectId.test(/^[a-zA-Z0-9][a-zA-Z0-9\-]+[a-zA-Z0-9]$/)) {
      return this.setState({
        errors: { projectId: regexErrorMessage }
      });
    }

    this.setState({ errors: {} });

    try {
      await APIClient.post('/v1/projects', form);

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
              <div>
                لطفا یک پروژه انتخاب کنید:
                <ul>
                  {projects.map(project => (
                    <li key={project._id}>{project.project_id}</li>
                  ))}
                </ul>

                یا یک پروژه‌ی جدید بسازید:
                <Button color="secondary" onClick={this.toggleCreateProjectDialog}>ایجاد پروژه‌ی جدید</Button>
              </div>
            )}
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

export default withStyles(styles)(Start);