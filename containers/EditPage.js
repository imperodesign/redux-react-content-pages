import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  fetchPage,
  updateHeader
} from '../actions'
import Header from '../components/Header'
// import Medias from '../components/Medias'
// import CreateMediaForm from '../components/CreateMediaForm'

class EditPage extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch, params } = this.props
    const { pageid } = params
    dispatch(fetchPage(pageid))
  }

  onUpdate (params) {
    const { id, dispatch } = this.props
    dispatch(updateHeader(id, params))
  }

  render () {
    const {
      isFetchingPage, id,
      name, description
    } = this.props

    return (
      <div>

        {isFetchingPage &&
          <h2>Loading...</h2>
        }

        {!isFetchingPage &&
          <Header
            id={id}
            name={name}
            description={description}
            onUpdate={this.onUpdate.bind(this)} />
        }

      </div>
    )
  }
}

EditPage.propTypes = {
  isFetchingPage: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  medias: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const { page } = state
  const {
    isFetchingPage, id,
    name, description,
    medias
  } = page

  return {
    isFetchingPage,
    id,
    name,
    description,
    medias
  }
}

export default connect(mapStateToProps)(EditPage)
