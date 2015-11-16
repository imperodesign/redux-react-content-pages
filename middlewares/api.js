import fetch from 'isomorphic-fetch'

export class Request {

  static _handleResponse (response) {
    if (response.status > 399) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    return response.json()
  }

  static get (url) {
    return fetch(url)
      .then(Request._handleResponse)
  }

  static post (url, params, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params ? JSON.stringify(params) : data
    })
      .then(Request._handleResponse)
  }

  static upload (url, params, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: params ? JSON.stringify(params) : data
    })
      .then(Request._handleResponse)
  }

  static put (url, params) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(Request._handleResponse)
  }

  static delete (url) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(Request._handleResponse)
  }

}
