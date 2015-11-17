import React, { PropTypes } from 'react'
import Media from './Media'
import SortableImageList from './SortableImageList'
import Uploader from './Uploader'

// Extends Media class
export default class GalleryMedia extends Media {

  constructor (props) {
    super(props)
    // TODO: enable multiupload
    this.multiple = false
    this.accept = '.jpg,.jpeg,.png,.gif'
  }

  // Inherit delete method from Media class

  update (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()
    onUpdate(id, {
      reference: this.refs.reference.value,
      name: this.refs.name.value
    })
  }

  uploadImage (files) {
    const { id, onUploadImage } = this.props
    // TODO: Check if it's the right way to make this...
    files.forEach((file, i) => onUploadImage(id, file))
  }

  updateImage (fileId, params) {
    const { id, onUpdateImage } = this.props
    onUpdateImage(id, fileId, params)
  }

  deleteImage (fileId) {
    const { id, onDeleteImage } = this.props
    onDeleteImage(id, fileId)
  }

  render () {
    const {
      id, reference, name, imageFiles,
      onSort
    } = this.props

    return (
      <div>
        <br />
        <b>Gallery Media</b> (<a href='#' onClick={this.delete.bind(this)}>Delete</a>)
        <br />
        <form>
          Reference: <input
            type='text'
            defaultValue={reference}
            ref='reference'
            onBlur={this.update.bind(this)} />
          <br />
          Name: <input
            type='text'
            defaultValue={name}
            ref='name'
            onBlur={this.update.bind(this)} />
          <br />
          {imageFiles.length > 0 &&
            <SortableImageList
              key={Math.random()}
              mediaId={id}
              images={imageFiles}
              onSort={onSort}
              onUpdateImage={this.updateImage.bind(this)}
              onDeleteImage={this.deleteImage.bind(this)} />}
          {imageFiles.length > 0 &&
            <br />}
          <Uploader
            multiple={this.multiple}
            accept={this.accept}
            onUpload={this.uploadImage.bind(this)} />
        </form>
      </div>
    )
  }
}

GalleryMedia.propTypes = Object.assign({}, Media.propTypes, {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageFiles: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
})
