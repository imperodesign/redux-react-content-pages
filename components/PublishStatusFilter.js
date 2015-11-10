import React, { Component, PropTypes } from 'react'
import { SHOW_ALL, SHOW_PUBLISHED, SHOW_UNPUBLISHED } from '../constants/PageFilters'

export default class PublishStatusFilter extends Component {
  renderFilter (filter, name) {
    if (filter === this.props.filter) {
      return name
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {name}
      </a>
    )
  }

  render () {
    return (
      <p>
        Show:
        {' '}
        {this.renderFilter(SHOW_ALL, 'All')}
        {', '}
        {this.renderFilter(SHOW_PUBLISHED, 'Published')}
        {', '}
        {this.renderFilter(SHOW_UNPUBLISHED, 'Unpublished')}
        .
      </p>
    )
  }
}

PublishStatusFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    SHOW_ALL,
    SHOW_PUBLISHED,
    SHOW_UNPUBLISHED
  ]).isRequired
}
