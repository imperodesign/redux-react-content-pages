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

export default publishStatusFilter
