'use strict'

import React, { Component } from 'react'

const placeholder = document.createElement('li')
placeholder.className = 'placeholder'

export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  componentWillMount () {
    // this.state = this.props
  }

  dragStart (e) {
    this.dragged = e.currentTarget
    e.dataTransfer.effectAllowed = 'move'

    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData('text/html', e.currentTarget)
  }

  dragEnd (e) {
    this.dragged.style.display = 'block'
    this.dragged.parentNode.removeChild(placeholder)

    // Update data
    const data = this.state.data
    let from = Number(this.dragged.dataset.id)
    let to = Number(this.over.dataset.id)
    if (from < to) to--
    if (this.nodePlacement === 'after') to++
    data.splice(to, 0, data.splice(from, 1)[0])
    this.setState({data: data})
  }

  dragOver (e) {
    e.preventDefault()
    this.dragged.style.display = 'none'
    if (e.target.className === 'placeholder') return
    this.over = e.target
    // Inside the dragOver method
    const relY = e.clientY - this.over.offsetTop
    const height = this.over.offsetHeight / 2
    const parent = e.target.parentNode

    if (relY > height) {
      this.nodePlacement = 'after'
      parent.insertBefore(placeholder, e.target.nextElementSibling)
    } else if (relY < height) {
      this.nodePlacement = 'before'
      parent.insertBefore(placeholder, e.target)
    }
  }

  render () {
    console.log('Rerender')
    const listItems = this.state.data.map((item, i) => {
      return (
        <li data-id={i}
            key={i}
            draggable='true'
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}>
          {item}
        </li>
      )
    })

    return <ul onDragOver={this.dragOver.bind(this)}>{listItems}</ul>
  }
}
