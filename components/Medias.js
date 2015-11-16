import React, { PropTypes, Component } from 'react'
import * as MediaTypes from '../constants/MediaTypes'
import TextMedia from './TextMedia'
import ImageMedia from './ImageMedia'
import GalleryMedia from './GalleryMedia'

export default class Medias extends Component {

  render () {
    const {
      onDelete, onUpdate, onUploadFileMedia
    } = this.props

    const medias = this.props.medias.map((media, i) => {
      switch (media.type) {
        case MediaTypes.TEXT:
          return (
            <TextMedia key={i}
              id={media.id}
              reference={media.reference}
              name={media.name}
              content={media.content}
              onUpdate={onUpdate}
              onDelete={onDelete} />
          )
        case MediaTypes.IMAGE:
          return (
            <ImageMedia key={i}
              id={media.id}
              reference={media.reference}
              caption={media.caption}
              filepath={media.filepath}
              onUpdate={onUpdate}
              onUploadImage={onUploadFileMedia}
              onDelete={onDelete} />
          )
        case MediaTypes.GALLERY:
          return (
            <GalleryMedia key={i}
              id={media.id}
              reference={media.reference}
              name={media.name}
              filepaths={media.filepaths}
              onUpdate={onUpdate}
              onUploadImage={onUploadFileMedia}
              onDelete={onDelete} />
          )
        default:
          // BOOM! WDF :)
      }
    })

    return (
      <div>
        {medias}
      </div>
    )
  }
}

Medias.propTypes = {
  medias: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUploadFileMedia: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
