import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPages } from '../actions'
// import Picker from '../components/Picker'
import Pages from '../components/Pages'

class ListPage extends Component {
  constructor (props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchPages())
  }

  // handleChange(nextReddit) {
  //   this.props.dispatch(selectReddit(nextReddit))
  // }
  //
  // handleRefreshClick(e) {
  //   e.preventDefault()
  //
  //   const { dispatch, selectedReddit } = this.props
  //   dispatch(invalidateReddit(selectedReddit))
  //   dispatch(fetchPostsIfNeeded(selectedReddit))
  // }

  // <Picker value={selectedReddit}
  //         onChange={this.handleChange}
  //         options={[ 'reactjs', 'frontend' ]} />

  render () {
    const { pages, isFetching } = this.props

    return (
      <div>
        {isFetching && pages.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && pages.length === 0 &&
          <h2>Empty.</h2>
        }
        {pages.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Pages pages={pages} />
          </div>
        }
      </div>
    )
  }
}

ListPage.propTypes = {
  pages: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const { pages } = state
  const { isFetching, items } = pages

  console.log(pages)

  return {
    pages: items,
    isFetching
  }
}

export default connect(mapStateToProps)(ListPage)
