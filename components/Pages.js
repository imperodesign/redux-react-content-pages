import React, { PropTypes, Component } from 'react'
import Page from './Page'

export default class Pages extends Component {
  render () {
    const {
      onTogglePublish, onDelete,
      isDeleting, deletingPageId
    } = this.props
    const pages = this.props.pages.map((page, i) =>
      <Page key={i}
        id={page.id}
        name={page.name}
        published={page.published}
        isDeleting={isDeleting}
        deletingPageId={deletingPageId}
        onTogglePublish={onTogglePublish}
        onDelete={onDelete}
        />
    )
    return (
      <ul>
        {pages}
      </ul>
    )
  }
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  deletingPageId: PropTypes.string.isRequired,
  onTogglePublish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
