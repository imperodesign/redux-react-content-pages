import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  fetchPage,
  updateHeader,
  createMedia,
  updateMedia
} from '../actions'
import Header from '../components/Header'
import Medias from '../components/Medias'
import CreateMediaForm from '../components/CreateMediaForm'

class EditPage extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch, params } = this.props
    const { pageid } = params
    dispatch(fetchPage(pageid))
  }

  onUpdateHeader (params) {
    const { id, dispatch } = this.props
    dispatch(updateHeader(id, params))
  }

  onCreateMedia (type) {
    const { id, dispatch } = this.props
    dispatch(createMedia(id, type))
  }

  onUpdateMedia (id, params) {
    const { dispatch } = this.props
    dispatch(updateMedia(id, params))
  }

  onDeleteMedia (type) {
    const { id, dispatch } = this.props
    dispatch(createMedia(type, id))
  }

  render () {
    const {
      isFetchingPage, id,
      name, description,
      medias
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
            onUpdate={this.onUpdateHeader.bind(this)} />}

        {!isFetchingPage &&
          <Medias
            medias={medias}
            onUpdate={this.onUpdateMedia.bind(this)}
            onDelete={this.onDeleteMedia.bind(this)} />}

        {!isFetchingPage &&
          <br /> }

        {!isFetchingPage &&
          <CreateMediaForm
            onCreate={this.onCreateMedia.bind(this)} />}
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
