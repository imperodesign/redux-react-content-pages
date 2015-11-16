import React, { PropTypes } from 'react'
import Media from './Media'
import SortableImageList from './SortableImageList'
import Uploader from './Uploader'

// Extends Media class
export default class GalleryMedia extends Media {

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
      name: this.refs.name.value
    })
  }

  uploadImage (e, files) {
    const { id, onUploadImage } = this.props
    e.preventDefault()
    if (files.length > 0) onUploadImage(id, files[0])
    else console.error('Files[] is empty... and this is wrong.')
  }

  handleSort () {
    console.log('sorting...')
  }

  render () {
    const {
      reference, name, filepaths
    } = this.props

    return (
      <div>
        <br />
        <b>Gallery Media</b>
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
          {filepaths.length > 0 &&
            <SortableImageList
              key={Math.random()}
              data={filepaths} />}
          {filepaths.length > 0 &&
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
  name: PropTypes.string.isRequired,
  filepaths: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired
})
