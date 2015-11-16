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

export function setPublishStatusFilter (filter) {
  return { type: types.SET_PUBLISH_STATUS_FILTER, filter }
}

export function setTextSearchFilter (filter) {
  return { type: types.SET_TEXT_SEARCH_FILTER, filter }
}

/*
 * EDIT PAGE
 */

function fetchPageRequest (id) {
  return { type: types.FETCH_PAGE_REQUEST, id }
}

function fetchPageSuccess (json) {
  return { type: types.FETCH_PAGE_SUCCESS, page: json }
}

function fetchPageFailure (error) {
  return { type: types.FETCH_PAGE_FAILURE, error }
}

export function fetchPage (id) {
  return dispatch => {
    dispatch(fetchPageRequest(id))
    Request.get(`${PAGES_URL}/${id}`)
      .then(json => dispatch(fetchPageSuccess(json)))
      .catch(err => fetchPageFailure(err))
  }
}

function updateHeaderRequest (id) {
  return { type: types.UPDATE_HEADER_REQUEST, id }
}

function updateHeaderSuccess (json) {
  return { type: types.UPDATE_HEADER_SUCCESS, page: json }
}

function updateHeaderFailure (error) {
  return { type: types.UPDATE_HEADER_FAILURE, error }
}

export function updateHeader (id, headerParams) {
  return dispatch => {
    dispatch(updateHeaderRequest(id))
    Request.put(`${PAGES_URL}/${id}`, headerParams)
      .then(json => dispatch(updateHeaderSuccess(json)))
      .catch(err => dispatch(updateHeaderFailure(err)))
  }
}

/*
 * EDIT PAGE (MEDIAS)
 */

function createMediaRequest () {
  return { type: types.CREATE_MEDIA_REQUEST }
}

function createMediaSuccess (json) {
  return { type: types.CREATE_MEDIA_SUCCESS, media: json }
}

function createMediaFailure (error) {
  return { type: types.CREATE_MEDIA_FAILURE, error }
}

export function createMedia (pageId, type) {
  return dispatch => {
    dispatch(createMediaRequest())
    Request.post(`${PAGES_URL}/${pageId}/medias`, { type })
      .then(json => dispatch(createMediaSuccess(json)))
      .catch(err => dispatch(createMediaFailure(err)))
  }
}

function updateMediaRequest (mediaId) {
  return { type: types.UPDATE_MEDIA_REQUEST, mediaId }
}

function updateMediaSuccess (json) {
  return { type: types.UPDATE_MEDIA_REQUEST, media: json }
}

function updateMediaFailure (error) {
  return { type: types.UPDATE_MEDIA_REQUEST, error }
}

export function updateMedia (pageId, mediaId, params) {
  return dispatch => {
    dispatch(updateMediaRequest(mediaId))
    Request.put(`${PAGES_URL}/${pageId}/medias/${mediaId}`, params)
      .then(json => dispatch(updateMediaSuccess(json)))
      .catch(err => dispatch(updateMediaFailure(err)))
  }
}

function uploadFileMediaRequest (mediaId) {
  return { type: types.UPLOAD_FILE_MEDIA_REQUEST, mediaId }
}

function uploadFileMediaSuccess (json) {
  return { type: types.UPLOAD_FILE_MEDIA_SUCCESS, media: json }
}

function uploadFileMediaFailure (error) {
  return { type: types.UPLOAD_FILE_MEDIA_FAILURE, error }
}

export function uploadFileMedia (pageId, mediaId, file) {
  return dispatch => {
    dispatch(uploadFileMediaRequest(mediaId))
    const data = new window.FormData()
    data.append('file', file)
    Request.upload(`${PAGES_URL}/${pageId}/medias/${mediaId}/files`, null, data)
      .then(json => dispatch(uploadFileMediaSuccess(json)))
      .catch(err => dispatch(uploadFileMediaFailure(err)))
  }
}
