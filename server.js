'use strict'

const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const _ = require('lodash')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const Busboy = require('busboy')
const config = require('./webpack.config')

const app = express()
const port = 3000

let pages = JSON.parse(fs.readFileSync(`${__dirname}/pages.json`))

const urlEncoder = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use('/files', express.static(`${__dirname}/tmp`))

function findPageById (id) {
  let page = null
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].id === id) page = pages[i]
  }
  return page
}

function updateMediaById (medias, id, params) {
  let media = null
  for (let i = 0; i < medias.length; i++) {
    if (medias[i].id === id) {
      medias[i] = _.assign(medias[i], params)
      media = medias[i]
    }
  }
  return media
}

function findMediaById (medias, id) {
  let media = null
  for (let i = 0; i < medias.length; i++) {
    if (medias[i].id === id) media = medias[i]
  }
  return media
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

function deletePageById (id) {
  let page = null
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].id === id) {
      page = pages[i]
      pages = [
        ...pages.slice(0, i),
        ...pages.slice(i + 1)
      ]

      break
    }
  }
  return page
}

app.get('/pages', (req, res) => res.json(pages))

app.get('/pages/:id', (req, res) => res.json(findPageById(req.params.id)))

app.post('/pages', urlEncoder, jsonParser, (req, res) => {
  const page = _.assign({}, req.body)
  page.id = shortid.generate()
  page.description = ''
  page.published = false
  page.medias = []
  pages.push(page)

  // Simulate latency
  setTimeout(() => {
    res.json(page)
  }, 3000)
})

app.put('/pages/:id', urlEncoder, jsonParser, (req, res) => {
  // Simulate latency
  setTimeout(() => {
    res.json(updatePageById(req.params.id, req.body))
  }, 1750)
})

app.delete('/pages/:id', (req, res) => {
  // Simulate latency
  setTimeout(() => {
    res.json(deletePageById(req.params.id))
  }, 1500)
})

app.post('/pages/:pageId/medias', urlEncoder, jsonParser, (req, res, next) => {
  // Find the page
  const page = findPageById(req.params.pageId)

  // Create the new media
  const media = _.assign({}, req.body)
  media.id = shortid.generate()
  media.reference = ''

  if (media.type === 'text') {
    media.name = ''
    media.content = ''
  } else if (media.type === 'image') {
    media.caption = ''
    media.filepath = ''
  } else if (media.type === 'gallery') {
    media.name = ''
    media.filepaths = []
  }

  // OTHER TYPES COMING

  page.medias.push(media)

  // Simulate latency
  setTimeout(() => {
    res.json(media)
  }, 500)
})

app.put('/pages/:pageId/medias/:mediaId', urlEncoder, jsonParser, (req, res, next) => {
  // Find the page
  const page = findPageById(req.params.pageId)

  // Find the media
  const media = updateMediaById(page.medias, req.params.mediaId, req.body)

  // Simulate latency
  setTimeout(() => {
    res.json(media)
  }, 500)
})

app.post('/pages/:pageId/medias/:mediaId/files', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers })

  let _filepath = null

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.join(__dirname, '/tmp/', filename)
    file.pipe(fs.createWriteStream(saveTo))
    _filepath = filename
  })

  // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
  //   console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  // })

  busboy.on('finish', () => {
    // Find the page
    const page = findPageById(req.params.pageId)

    // Find the media
    let media = findMediaById(page.medias, req.params.mediaId)

    let updateParams = { filepath: _filepath }

    if (media.type === 'gallery') {
      updateParams = {
        filepaths: media.filepaths.concat([_filepath])
      }
    }

    // Update the media
    media = updateMediaById(page.medias, req.params.mediaId, updateParams)

    res.json(media)
  })

  req.pipe(busboy)
})

app.get('/pages.json', (req, res) => res.sendFile(`${__dirname}/pages.json`))

app.use('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

app.listen(port, error => {
  if (error) return console.error(error)
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
})
