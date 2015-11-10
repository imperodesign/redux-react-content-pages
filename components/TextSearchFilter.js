import React, { Component, PropTypes } from 'react'

export default class TextSearchFilter extends Component {

  render () {
    const { filter, onFilterChange } = this.props
    return (
      <p>
        Search:&nbsp;
        <input value={filter} type='text' placeholder='Type something ...' onChange={e => {
          e.preventDefault()
          onFilterChange(e.target.value)
        }} />
      </p>
    )
  }

}

TextSearchFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
}
