import * as types from '../constants/ActionTypes'

function textSearchFilter (state = '', action) {
  switch (action.type) {
    case types.SET_TEXT_SEARCH_FILTER:
      return action.filter
    default:
      return state
  }
}

export default textSearchFilter
