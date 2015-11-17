import React, { PropTypes, Component } from 'react'

export default class Uploader extends Component {

  upload (e) {
    e.preventDefault()

    // Reset the counter along with the drag on a drop.
    this.enterCounter = 0

    const uploadedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files
    const max = this.props.multiple ? uploadedFiles.length : 1
    const files = []

    for (let i = 0; i < max; i++) {
      const file = uploadedFiles[i]
      file.preview = window.URL.createObjectURL(file)
      files.push(file)
    }

    // UPLOAD STUFF FOR REAL NOW :-)
    this.props.onUpload(files)
  }

  render () {
    return (
      <input
        type='file'
        ref='uploader'
        multiple={this.props.multiple}
        accept={this.props.accept}
        onChange={this.upload.bind(this)} />
    )
  }
}

Uploader.propTypes = {
  multiple: PropTypes.bool.isRequired,
  accept: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired
}
