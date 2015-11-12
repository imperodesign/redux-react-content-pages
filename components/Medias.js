import React, { PropTypes, Component } from 'react'
import * as MediaTypes from '../constants/MediaTypes'
import TextMedia from './TextMedia'
// import ImageMedia from './ImageMedia'
// import ButtonMedia from './ButtonMedia'

export default class Medias extends Component {

  render () {
    const {
      onDelete, onUpdate
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
  onDelete: PropTypes.func.isRequired
}
