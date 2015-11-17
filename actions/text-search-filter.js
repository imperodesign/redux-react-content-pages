import * as types from '../constants/ActionTypes'

export function setTextSearchFilter (filter) {
  return { type: types.SET_TEXT_SEARCH_FILTER, filter }
}
