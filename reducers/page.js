import * as types from '../constants/ActionTypes'

function findIndex (list, id) {
  let i = 0
  // TODO: most efficient search algo in production or use hashmap for exampe
  for (; i < list.length; i++) {
    if (list[i].id === id) break
  }
  return i
}

function page (state = {
  id: '',
  name: '',
  description: '',
  medias: [],
  isFetchingPage: false,
  isCreatingMedia: false,
  isUpdatingMedia: false, // missing reducer code
  isDeletingMedia: false,
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

    // here it should go UPDATE_MEDIA_REQUEST

    case types.DELETE_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isDeletingMedia: true
      })
    case types.DELETE_MEDIA_FAILURE:
      // SHOULD SHOW AN ERROR VIA AN ERROR COMPONENT
      return Object.assign({}, state, {
        isDeletingMedia: false
      })
    case types.DELETE_MEDIA_SUCCESS:
      index = findIndex(state.medias, action.media.id)
      return Object.assign({}, state, {
        isDeletingMedia: false,
        medias: [
          ...state.medias.slice(0, index),
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

export default page
