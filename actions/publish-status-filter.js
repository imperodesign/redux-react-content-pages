import * as types from '../constants/ActionTypes'

export function setPublishStatusFilter (filter) {
  return { type: types.SET_PUBLISH_STATUS_FILTER, filter }
}
