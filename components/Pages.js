import React, { PropTypes, Component } from 'react'

export default class Pages extends Component {
  render () {
    return (
      <ul>
        {this.props.pages.map((page, i) =>
          <li key={i}>{page.name}</li>
        )}
      </ul>
    )
  }
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired
}
