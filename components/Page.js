import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Pages extends Component {

  togglePublish () {
    const { id, onTogglePublish, published } = this.props
    onTogglePublish(id, !published)
  }

  render () {
    const { id, name, published } = this.props
    return (
      <li>
        <Link to={`/${id}`}>{name}</Link>
        (<a href='#' onClick={this.togglePublish.bind(this)}>{published ? 'Unpublish' : 'Publish'}</a>)
      </li>
    )
  }
}

Pages.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired,
  onTogglePublish: PropTypes.func.isRequired
}
