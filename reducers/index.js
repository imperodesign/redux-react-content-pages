import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import * as types from '../constants/ActionTypes'
import { SHOW_ALL } from '../constants/PageFilters'

function visibilityFilter (state = SHOW_ALL, action) {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function pages (state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case types.REQUEST_PAGES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_PAGES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.pages
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  visibilityFilter,
  pages,
  router
})

export default rootReducer
