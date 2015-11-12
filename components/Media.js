import { PropTypes, Component } from 'react'

export default class Media extends Component {
  delete () {
    const { id, onDelete } = this.props
    onDelete(id)
  }
}

Media.propTypes = {
  id: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}
