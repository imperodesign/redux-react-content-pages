import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Pages extends Component {

  togglePublish () {
    const { id, onTogglePublish, published } = this.props
    onTogglePublish(id, !published)
  }

  delete () {
    const { id, onDelete } = this.props
    onDelete(id)
  }

  render () {
    const { id, name, published, isDeleting, deletingPageId } = this.props

    return (
      <li>
        <Link to={`/${id}`}>{name}</Link>
        (
          <a href='#'
            onClick={this.togglePublish.bind(this)}>
              {published ? 'Unpublish' : 'Publish'}
          </a>
          {isDeleting &&
            deletingPageId === id ? '' : <span> | <a href='#' onClick={this.delete.bind(this)}>Delete</a></span>}
        )
      </li>
    )
  }
}

Pages.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  deletingPageId: PropTypes.string.isRequired,
  onTogglePublish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
