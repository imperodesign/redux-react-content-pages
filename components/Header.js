import React, { Component, PropTypes } from 'react'

export default class Header extends Component {

  constructor () {
    super()
  }

  onBlur (e) {
    const { onUpdate } = this.props
    e.preventDefault()
    onUpdate({
      name: this.refs.name.value,
      description: this.refs.description.value
    })
  }

  // componentWillMount () {
  //   const { inputNameValue } = this.props
  //   this.state = { inputNameValue }
  // }
  //
  // componentWillReceiveProps (nextProps) {
  //   const { inputNameValue } = nextProps
  //   this.setState({ inputNameValue })
  // }
  //
  // handleChange (e) {
  //   const inputNameValue = this.refs.name.value
  //   this.setState({ inputNameValue })
  // }

  renderForm () {
    const { name, description } = this.props
    return (
      <form>
        Name: <input
          defaultValue={name}
          onBlur={this.onBlur.bind(this)}
          placeholder={'What\'s the name of your page?'}
          type='text'
          ref='name' />
        <br />
        Description: <input
          defaultValue={description}
          onBlur={this.onBlur.bind(this)}
          placeholder={'What\'s the description of your page?'}
          type='text'
          ref='description' />
      </form>
    )
  }

  render () {
    return this.renderForm()
  }

}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
}
