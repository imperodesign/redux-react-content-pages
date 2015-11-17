import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import publishStatusFilter from './publish-status-filter'
import textSearchFilter from './text-search-filter'
import pages from './pages'
import page from './page'

const rootReducer = combineReducers({
  publishStatusFilter,
  textSearchFilter,
  pages,
  page,
  router
})

export default rootReducer
