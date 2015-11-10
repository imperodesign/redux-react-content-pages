'use strict'

const fs = require('fs')
const shortid = require('shortid')
const _ = require('lodash')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const config = require('./webpack.config')

const app = new (require('express'))()
const port = 3000

const pages = JSON.parse(fs.readFileSync(`${__dirname}/pages.json`))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

function findPageById (id) {
  let page = null
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].id === id) page = pages[i]
  }
  return page
}

function updatePageById (id, params) {
  let page = null
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].id === id) {
      pages[i] = _.assign(pages[i], params)
      page = pages[i]
    }
  }
  return page
}

app.get('/pages', (req, res) => res.json(pages))
app.get('/pages/:id', (req, res) => res.json(findPageById(req.params.id)))
app.post('/pages', (req, res) => {
  const page = _.assign({}, req.body)
  page.id = shortid.generate()
  page.published = false
  pages.push(page)

  // Simulate latency
  setTimeout(() => {
    res.json(page)
  }, 3000)
})
app.put('/pages/:id', (req, res) => res.json(updatePageById(req.params.id, req.body)))
app.delete('/pages', (req, res) => res.json(pages))

app.get('/pages.json', (req, res) => res.sendFile(`${__dirname}/pages.json`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

app.listen(port, error => {
  if (error) return console.error(error)
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
})
