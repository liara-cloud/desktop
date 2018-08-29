import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import TitleBar from '../components/TitleBar';
import DropZone from '../components/DropZone';

const styles = theme => ({
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
  }

  showDropZone = () => {
    this.setState({ dropZone: true })
  }

  hideDropZone = () => {
    this.setState({ dropZone: false })
  }

  preventDefault(event) {
    // Make the cursor look good
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.dropEffect = 'copy'

    event.preventDefault()
  }

  droppedFile = event => {
    this.hideDropZone()

    if (!event.dataTransfer || !event.dataTransfer.files) {
      return
    }

    const { files } = event.dataTransfer
    const list = [...files].map(file => file.path)

    // Shoot them into the cloud
    // this.deploy(list)
    console.log(list);

    // And prevent the window from loading the file inside it
    event.preventDefault()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <TitleBar />
        <DropZone
          onDragEnter={this.showDropZone}
          onDragLeave={this.hideDropZone}
          onDragOver={this.preventDefault}
          onDrop={this.droppedFile}
          style={{ flex: 1 }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Start);