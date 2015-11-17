'use strict'

import React, { Component } from 'react'
import $ from 'jquery'
import shortid from 'shortid'
require('jquery-ui')

export default class SortableImageList extends Component {
  constructor (props) {
    super(props)
    this.state = props
    this.id = shortid.generate() // this can be the media id
  }

  componentWillMount () {
    // this.state = this.props
  }

  componentDidMount () {
    const sortableList = $(`#${this.id}`).sortable({
      placeholder: 'ui-state-highlight',
      stop: function (e, ui) {
        console.log(sortableList.sortable('toArray'))
      }})
    $('.sortable').disableSelection()
  }

  render () {
    const list = this.state.data.map((item, i) => {
      const styleListElement = {
        backgroundImage: `url(/files/${item})`,
        width: '100%',
        height: '64px',
        display: 'block',
        backgroundSize: '64px 64px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top'
      }
      const styleInput = {
        margin: '20px',
        marginLeft: '90px'
      }
      return (
        <li id={i}
            className='ui-state-default'
            key={i}
            style={styleListElement}>
            <input
              type='text'
              placeholder='Caption'
              style={styleInput} />
            <button type='button'>Delete</button>
        </li>
      )
    })

    return <ul id={this.id} className={'sortable'}>{list}</ul>
  }
}
