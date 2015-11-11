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
  isUpdating: false,
  isDeleting: false,
  deletingPageId: '',
  updatingPageId: '',
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
    case types.UPDATE_PAGE_REQUEST:
      return Object.assign({}, state, {
        updatingPageId: action.id,
        isUpdating: true
      })
    case types.UPDATE_PAGE_FAILURE:
      return Object.assign({}, state, {
        updatingPageId: '',
        isUpdating: false
      })
    case types.UPDATE_PAGE_SUCCESS:
      index = findIndex(state.items, action.page.id)
      return Object.assign({}, state, {
        updatingPageId: '',
        isUpdating: false,
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

const rootReducer = combineReducers({
  publishStatusFilter,
  textSearchFilter,
  pages,
  router
})

export default rootReducer
