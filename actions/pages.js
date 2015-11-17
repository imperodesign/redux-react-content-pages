import { Request } from '../middlewares/api'
import * as types from '../constants/ActionTypes'
import { PAGES_URL } from '../constants/URLs'

function requestPages () {
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
    Request.get(PAGES_URL)
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
    Request.post(PAGES_URL, { name })
      .then(json => dispatch(createPageSuccess(json)))
      .catch(err => dispatch(createPageFailure(err)))
  }
}

function togglePublishRequest (id) {
  return { type: types.TOGGLE_PUBLISH_REQUEST, id }
}

function togglePublishSuccess (json) {
  return { type: types.TOGGLE_PUBLISH_SUCCESS, page: json }
}

function togglePublishFailure (error) {
  return { type: types.TOGGLE_PUBLISH_FAILURE, error }
}

export function togglePublish (id, published) {
  return dispatch => {
    dispatch(togglePublishRequest(id))
    Request.put(`${PAGES_URL}/${id}`, { published })
      .then(json => dispatch(togglePublishSuccess(json)))
      .catch(err => dispatch(togglePublishFailure(err)))
  }
}

function deletePageRequest (id, params) {
  return { type: types.DELETE_PAGE_REQUEST, id }
}

function deletePageSuccess (json) {
  return { type: types.DELETE_PAGE_SUCCESS, page: json }
}

function deletePageFailure (error) {
  return { type: types.DELETE_PAGE_FAILURE, error }
}

export function deletePage (id) {
  return dispatch => {
    dispatch(deletePageRequest(id))
    Request.delete(`${PAGES_URL}/${id}`)
      .then(json => dispatch(deletePageSuccess(json)))
      .catch(err => dispatch(deletePageFailure(err)))
  }
}
