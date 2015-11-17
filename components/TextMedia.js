import React, { PropTypes } from 'react'
import Media from './Media'

// Extends Media class
export default class TextMedia extends Media {

  // Inherit delete method from Media class

  onBlur (e) {
    const { id, onUpdate } = this.props
    e.preventDefault()
    onUpdate(id, {
      reference: this.refs.reference.value,
      name: this.refs.name.value,
      content: this.refs.content.value
    })
  }

  render () {
    const {
      reference, name, content
    } = this.props

    return (
      <div>
        <br />
        <b>Text Media</b> (<a href='#' onClick={this.delete.bind(this)}>Delete</a>)
        <br />
        <form>
          Reference: <input
            type='text'
            defaultValue={reference}
            ref='reference'
            onBlur={this.onBlur.bind(this)} />
          <br />
          Name: <input
            type='text'
            defaultValue={name}
            ref='name'
            onBlur={this.onBlur.bind(this)} />
          <br />
          Content: <textarea
            type='text'
            defaultValue={content}
            ref='content'
            onBlur={this.onBlur.bind(this)} />
        </form>
      </div>
    )
  }
}

TextMedia.propTypes = Object.assign({}, Media.propTypes, {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
})
