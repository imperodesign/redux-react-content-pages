import React, { Component, PropTypes } from 'react'

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
          onClick={this.onCreate.bind(this, 'Text')}
          type='button'>Text</button>
        <button
          onClick={this.onCreate.bind(this, 'Image')}
          type='button'>Image</button>
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
