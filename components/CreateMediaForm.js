import React, { Component, PropTypes } from 'react'
import * as MediaTypes from '../constants/MediaTypes'

export default class CreateMediaForm extends Component {

  constructor () {
    super()
  }

  onCreate (type, e) {
    const { onCreate } = this.props
    e.preventDefault()
    onCreate(type)
  }

  renderForm () {
    return (
      <form>
        <b>Add: </b>
        <button
          onClick={this.onCreate.bind(this, MediaTypes.TEXT)}
          type='button'>Text</button>
        <button
          onClick={this.onCreate.bind(this, MediaTypes.IMAGE)}
          type='button'>Image</button>
        <button
          onClick={this.onCreate.bind(this, MediaTypes.GALLERY)}
          type='button'>Gallery</button>
      </form>
    )
  }

  render () {
    return this.renderForm()
  }

}

CreateMediaForm.propTypes = {
  onCreate: PropTypes.func.isRequired
}
