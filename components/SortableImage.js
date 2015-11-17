'use strict'

import React, { Component, PropTypes } from 'react'

export default class SortableImageList extends Component {
  constructor (props) {
    super(props)
  }

  update (e) {
    e.preventDefault()
    const { id, onUpdate } = this.props
    onUpdate(id, {
      caption: this.refs.caption.value
    })
  }

  delete (e) {
    e.preventDefault()
    const { id, onDelete } = this.props
    onDelete(id)
  }

  render () {
    const { filename, caption } = this.props

    const styleListElement = {
      backgroundImage: `url(/files/${filename})`,
      width: '100%',
      height: '64px',
      display: 'block',
      backgroundSize: '64px 64px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left top'
    }

    const styleInput = {
      margin: '20px',
      marginLeft: '90px'
    }

    return (
      <li id={this.props.id}
        className='ui-state-default'
        style={styleListElement}>
        <input
          defaultValue={caption}
          type='text'
          ref='caption'
          placeholder='Caption'
          onBlur={this.update.bind(this)}
          style={styleInput} />
        <button
          onClick={this.delete.bind(this)}
          type='button'>Delete</button>
      </li>
    )
  }
}

SortableImageList.propTypes = {
  id: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
