import fetch from 'isomorphic-fetch'

export const REQUEST_PAGES = 'REQUEST_POSTS'
export const RECEIVE_PAGES = 'RECEIVE_POSTS'
// export const SELECT_REDDIT = 'SELECT_REDDIT'
// export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

// export function selectReddit (reddit) {
//   return {
//     type: SELECT_REDDIT,
//     reddit
//   }
// }
//
// export function invalidateReddit (reddit) {
//   return {
//     type: INVALIDATE_REDDIT,
//     reddit
//   }
// }

function requestPages (reddit) {
  return {
    type: REQUEST_PAGES
  }
}

function receivePages (json) {
  return {
    type: RECEIVE_PAGES,
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
