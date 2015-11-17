import * as types from '../constants/ActionTypes'

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

export default pages
