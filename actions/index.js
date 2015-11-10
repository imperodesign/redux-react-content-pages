import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'

function requestPages (reddit) {
  return {
    type: types.REQUEST_PAGES
  }
}

function receivePages (json) {
  return {
    type: types.RECEIVE_PAGES,
    pages: json
  }
}

export function fetchPages () {
  return dispatch => {
    dispatch(requestPages())
    return fetch(`http://localhost:3000/pages.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePages(json)))
  }
}

export function setPublishStatusFilter (filter) {
  return { type: types.SET_PUBLISH_STATUS_FILTER, filter }
}

export function setTextSearchFilter (filter) {
  return { type: types.SET_TEXT_SEARCH_FILTER, filter }
}
