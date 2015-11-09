import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'

import {
  REQUEST_PAGES, RECEIVE_PAGES
} from '../actions'

function pages (state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_PAGES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PAGES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.pages
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  pages,
  router
})

export default rootReducer
