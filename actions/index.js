import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import { PAGES_URL } from '../constants/URLs'

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
    return fetch(PAGES_URL)
      .then(response => {
        if (response.status > 399) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }
        return response.json()
      })
      .then(json => dispatch(receivePages(json)))
      .catch(err => console.error(err))
  }
}

function createPageRequest (name) {
  return { type: types.CREATE_PAGE_REQUEST, name }
}

function createPageSuccess (json) {
  return { type: types.CREATE_PAGE_SUCCESS, page: json }
}

function createPageFailure (error) {
  return { type: types.CREATE_PAGE_FAILURE, error }
}

export function createPage (name) {
  return dispatch => {
    dispatch(createPageRequest(name))
    return fetch(PAGES_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(response => {
        if (response.status > 399) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }
        return response.json()
      })
      .then(json => dispatch(createPageSuccess(json)))
      .catch(err => dispatch(createPageFailure(err)))
  }
}

function updatePageRequest (id, params) {
  return { type: types.UPDATE_PAGE_REQUEST, id, params }
}

function updatePageSuccess (json) {
  return { type: types.UPDATE_PAGE_SUCCESS, page: json }
}

function updatePageFailure (error) {
  return { type: types.UPDATE_PAGE_FAILURE, error }
}

export function updatePage (id, params) {
  return dispatch => {
    dispatch(updatePageRequest(id))
    return fetch(`${PAGES_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(response => {
        if (response.status > 399) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }
        return response.json()
      })
      .then(json => dispatch(updatePageSuccess(json)))
      .catch(err => dispatch(updatePageFailure(err)))
  }
}

export function setPublishStatusFilter (filter) {
  return { type: types.SET_PUBLISH_STATUS_FILTER, filter }
}

export function setTextSearchFilter (filter) {
  return { type: types.SET_TEXT_SEARCH_FILTER, filter }
}
