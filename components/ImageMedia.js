import React, { PropTypes } from 'react'
import Media from './Media'
import Uploader from './Uploader'

// Extends Media class
export default class ImageMedia extends Media {

  constructor (props) {
    super(props)
    this.multiple = false
    this.accept = '.jpg,.jpeg,.png,.gif'
  }

  // Inherit delete method from Media class

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()
    onUpdate(id, {
      reference: this.refs.reference.value,
      caption: this.refs.caption.value
    })
  }

  uploadImage (files) {
    const { id, onUploadImage } = this.props
    if (files.length > 0) onUploadImage(id, files[0])
    else console.error('Files[] is empty... and this is wrong.')
  }

  render () {
    const {
      reference, caption, imageFile
    } = this.props

    return (
      <div>
        <br />
        <b>Image Media</b> (<a href='#' onClick={this.delete.bind(this)}>Delete</a>)
        <br />
        <form>
          Reference: <input
            type='text'
            defaultValue={reference}
            ref='reference'
            onBlur={this.update.bind(this)} />
          <br />
          Caption: <input
            type='text'
            defaultValue={caption}
            ref='caption'
            onBlur={this.update.bind(this)} />
          <br />
          {imageFile &&
            <img
              style={{ width: '64px', height: '64px' }}
              src={`/files/${imageFile.filename}`} />}
          <Uploader
            multiple={this.multiple}
            accept={this.accept}
            onUpload={this.uploadImage.bind(this)} />
        </form>
      </div>
    )
  }
}

ImageMedia.propTypes = Object.assign({}, Media.propTypes, {
  caption: PropTypes.string.isRequired,
  imageFile: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired
})
