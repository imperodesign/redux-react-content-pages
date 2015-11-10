import React, { PropTypes, Component } from 'react'
import Page from './Page'

export default class Pages extends Component {
  render () {
    const { onTogglePublish } = this.props
    const pages = this.props.pages.map((page, i) =>
      <Page key={i}
        id={page.id}
        name={page.name}
        published={page.published}
        onTogglePublish={onTogglePublish}
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
  onTogglePublish: PropTypes.func.isRequired
}
