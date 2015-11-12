import React from 'react'
import { Route, Router } from 'react-router'
import ListPage from './containers/ListPage'
import EditPage from './containers/EditPage'

export default (
  <Router>
    <Route path='/' component={ListPage}/>
    <Route path='/:pageid' component={EditPage}/>
  </Router>
)
