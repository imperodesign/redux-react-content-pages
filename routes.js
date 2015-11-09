import React from 'react'
import { Route, Router } from 'react-router'
import ListPage from './containers/ListPage'

export default (
  <Router>
    <Route path='/' component={ListPage}/>
  </Router>
)
