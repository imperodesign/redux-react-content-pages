import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import * as types from '../constants/ActionTypes'
import { SHOW_ALL } from '../constants/PageFilters'

function publishStatusFilter (state = SHOW_ALL, action) {
  switch (action.type) {
    case types.SET_PUBLISH_STATUS_FILTER:
      return action.filter
    default:
      return state
  }
}

function textSearchFilter (state = '', action) {
  switch (action.type) {
    case types.SET_TEXT_SEARCH_FILTER:
      return action.filter
    default:
      return state
  }
}

function findIndex (list, id) {
  let i = 0
  // TODO: most efficient search algo in production or use hashmap for exampe
  for (; i < list.length; i++) {
    if (list[i].id === id) break
  }
  return i
}

function pages (state = {
  isFetching: false,
  isCreating: false,
  isToggling: false,
  isDeleting: false,
  deletingPageId: '',
  togglingPageId: '',
  createFormInputNameValue: '',
  items: []
}, action) {
  let index = null

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
    case types.CREATE_PAGE_REQUEST:
      return Object.assign({}, state, {
        createFormInputNameValue: action.name,
        isCreating: true
      })
    case types.CREATE_PAGE_FAILURE:
      return Object.assign({}, state, {
        isCreating: false
      })
    case types.CREATE_PAGE_SUCCESS:
      return Object.assign({}, state, {
        isCreating: false,
        createFormInputNameValue: '',
        items: [
          ...state.items,
          action.page
        ]
      })
    case types.TOGGLE_PUBLISH_REQUEST:
      return Object.assign({}, state, {
        togglingPageId: action.id,
        isToggling: true
      })
    case types.TOGGLE_PUBLISH_FAILURE:
      return Object.assign({}, state, {
        togglingPageId: '',
        isToggling: false
      })
    case types.TOGGLE_PUBLISH_SUCCESS:
      index = findIndex(state.items, action.page.id)
      return Object.assign({}, state, {
        togglingPageId: '',
        isToggling: false,
        items: [
          ...state.items.slice(0, index),
          action.page,
          ...state.items.slice(index + 1)
        ]
      })
    case types.DELETE_PAGE_REQUEST:
      return Object.assign({}, state, {
        deletingPageId: action.id,
        isDeleting: true
      })
    case types.DELETE_PAGE_FAILURE:
      return Object.assign({}, state, {
        deletingPageId: '',
        isDeleting: false
      })
    case types.DELETE_PAGE_SUCCESS:
      index = findIndex(state.items, action.page.id)
      return Object.assign({}, state, {
        deletingPageId: '',
        isDeleting: false,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ]
      })
    default:
      return state
  }
}

function page (state = {
  id: '',
  name: '',
  description: '',
  medias: [],
  isFetchingPage: false,
  isCreatingMedia: false,
  isUploadingFileMedia: false,
  isUpdatingFileMedia: false,
  isDeletingFileMedia: false,
  isSortingGalleryMedia: false
}, action) {
  let index = null

  switch (action.type) {
    case types.FETCH_PAGE_REQUEST:
      return Object.assign({}, state, {
        isFetchingPage: true
      })
    case types.FETCH_PAGE_FAILURE:
      return Object.assign({}, state, {
        isFetchingPage: false,
        page: action.page
      })
    case types.FETCH_PAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingPage: false,
        id: action.page.id,
        name: action.page.name,
        description: action.page.description,
        medias: action.page.medias
      })

    case types.CREATE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isCreatingMedia: true
      })
    case types.CREATE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isCreatingMedia: false
      })
    case types.CREATE_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      return Object.assign({}, state, {
        isCreatingMedia: false,
        medias: [
          ...state.medias.slice(0, index),
          action.media,
          ...state.medias.slice(index + 1)
        ]
      })

    case types.UPLOAD_FILE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isUploadingFileMedia: true
      })
    case types.UPLOAD_FILE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isUploadingFileMedia: false
      })
    case types.UPLOAD_FILE_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      return Object.assign({}, state, {
        isUploadingFileMedia: false,
        medias: [
          ...state.medias.slice(0, index),
          action.media,
          ...state.medias.slice(index + 1)
        ]
      })

    case types.UPDATE_FILE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isUpdatingFileMedia: true
      })
    case types.UPDATE_FILE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isUpdatingFileMedia: false
      })
    case types.UPDATE_FILE_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      return Object.assign({}, state, {
        isUpdatingFileMedia: false,
        medias: [
          ...state.medias.slice(0, index),
          action.media,
          ...state.medias.slice(index + 1)
        ]
      })

    case types.DELETE_FILE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isDeletingFileMedia: true
      })
    case types.DELETE_FILE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isDeletingFileMedia: false
      })
    case types.DELETE_FILE_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      return Object.assign({}, state, {
        isDeletingFileMedia: false,
        medias: [
          ...state.medias.slice(0, index),
          action.media,
          ...state.medias.slice(index + 1)
        ]
      })

    case types.SORT_GALLERY_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isSortingGalleryMedia: true
      })
    case types.SORT_GALLERY_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isSortingGalleryMedia: false
      })
    case types.SORT_GALLERY_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      return Object.assign({}, state, {
        isSortingGalleryMedia: false,
        medias: [
          ...state.medias.slice(0, index),
          action.media,
          ...state.medias.slice(index + 1)
        ]
      })

    // TODO:
    // MISSING UPDATE_PAGE
    // MISSING UPDATE_MEDIA
    // MISSING UPLOAD_FILE_MEDIA

    default:
      return state
  }
}

const rootReducer = combineReducers({
  publishStatusFilter,
  textSearchFilter,
  pages,
  page,
  router
})

export default rootReducer
