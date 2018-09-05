import electron from 'electron';
import React, { Component, Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { default as MuiAppBar } from '@material-ui/core/AppBar';

import Logo from './Logo';

const styles = {
  wrapper: {
    display: 'flex',
    cursor: 'default',
    direction: 'ltr',
    backgroundColor: '#12171d',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    paddingLeft: 16,
    userSelect: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    '-webkit-app-region': 'drag',
  },
  closeButton: {
    borderRadius: 0,
    transition: 'none',
    '&:hover': {
      backgroundColor: 'rgba(232, 17, 35, .9)',
    }
  },
  minimizeButton: {
    borderRadius: 0,
    transition: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    }
  }
};

class TitleBar extends Component {
  componentDidMount() {
    this.remote = electron.remote;
    this.currentWindow = this.remote.getCurrentWindow();
  }

  handleClose = () => {
    this.currentWindow.close();
  }

  handleMinimize = () => {
    this.currentWindow.minimize();
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.wrapper}>
          <Typography className={classes.title} color="inherit">
            Liara
          </Typography>

          <div>
            <Button
              color="inherit"
              className={classes.minimizeButton}
              onClick={this.handleMinimize}
            >
              <MinimizeIcon />
            </Button>
            <Button
              color="inherit"
              className={classes.closeButton}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>

        <MuiAppBar position="static" color="primary" style={{ direction: 'ltr', userSelect: 'none' }}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1, display: 'flex', alignItems: 'center', userSelect: 'none' }}>
              <Logo style={{ marginRight: 15 }} />
              <img src="/static/logo-type.png" style={{ width: 50 }} alt="Liara" />
            </Typography>

            <IconButton color="inherit"  style={{ marginRight: 15 }}>
              <Avatar alt="Remy Sharp" src="https://material-ui-next.com/static/images/remy.jpg" />
            </IconButton>

          </Toolbar>
        </MuiAppBar>
      </Fragment>
    );
  }
}

export default withStyles(styles)(TitleBar);