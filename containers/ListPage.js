import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPages, setVisibilityFilter } from '../actions'
import * as VisibilityFilters from '../constants/PageFilters'
import Pages from '../components/Pages'
import Filter from '../components/Filter'

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
    const { visiblePages, isFetching, visibilityFilter, dispatch } = this.props

    return (
      <div>

        <Filter
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />

        {isFetching && visiblePages.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && visiblePages.length === 0 &&
          <h2>Empty.</h2>
        }
        {visiblePages.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Pages pages={visiblePages} />
          </div>
        }
      </div>
    )
  }
}

ListPage.propTypes = {
  visiblePages: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function selectPages (pages, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return pages
    case VisibilityFilters.SHOW_PUBLISHED:
      return pages.filter(page => page.published)
    case VisibilityFilters.SHOW_UNPUBLISHED:
      return pages.filter(page => !page.published)
  }
}

function mapStateToProps (state) {
  const { pages, visibilityFilter } = state
  const { isFetching, items } = pages

  return {
    visiblePages: selectPages(items, visibilityFilter),
    isFetching,
    visibilityFilter
  }
}

export default connect(mapStateToProps)(ListPage)
