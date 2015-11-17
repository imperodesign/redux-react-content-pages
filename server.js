'use strict'

/*
 * This server code is not the scope of this demo.
 * We simply need it to simulate a real API.
 * You should't use in a production env, since has been
 * built only for simuation puropose.
 */

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

function updateFileById (files, id, params) {
  let file = null
  for (let i = 0; i < files.length; i++) {
    if (files[i].id === id) {
      files[i] = _.assign(files[i], params)
      file = files[i]
    }
  }
  return file
}

function deleteFileById (media, files, id) {
  let file = null
  for (let i = 0; i < files.length; i++) {
    if (files[i].id === id) {
      file = files[i]
      files = [
        ...files.slice(0, i),
        ...files.slice(i + 1)
      ]
      media.imageFiles = files
      break
    }
  }
  return file
}

function deleteMediaById (page, medias, id) {
  let media = null
  for (let i = 0; i < medias.length; i++) {
    if (medias[i].id === id) {
      media = medias[i]
      medias = [
        ...medias.slice(0, i),
        ...medias.slice(i + 1)
      ]
      page.medias = medias
      break
    }
  }
  return media
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
    media.imageFile = null
  } else if (media.type === 'gallery') {
    media.name = ''
    media.imageFiles = []
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

app.delete('/pages/:pageId/medias/:mediaId', urlEncoder, jsonParser, (req, res, next) => {
  // Find the page
  const page = findPageById(req.params.pageId)

  // Delete the media
  const media = deleteMediaById(page, page.medias, req.params.mediaId)

  // Simulate latency
  setTimeout(() => {
    res.json(media)
  }, 500)
})

function getFileExt (mimetype) {
  switch (mimetype) {
    case 'image/gif':
      return '.gif'
    case 'image/png':
      return '.png'
    case 'image/jpeg':
      return '.jpeg'
    default:
      return '.jpg'
  }
}

app.post('/pages/:pageId/medias/:mediaId/files', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers })

  const uploadedFile = {}

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const id = shortid.generate()
    const newFilename = `${id}${getFileExt(mimetype)}`
    const saveTo = path.join(__dirname, '/tmp/', newFilename)
    file.pipe(fs.createWriteStream(saveTo))
    uploadedFile.id = id
    uploadedFile.caption = filename
    uploadedFile.filename = newFilename
    uploadedFile.originalFilename = filename
    uploadedFile.encoding = encoding
    uploadedFile.mimetype = mimetype
  })

  busboy.on('finish', () => {
    // Find the page
    const page = findPageById(req.params.pageId)

    // Find the media
    let media = findMediaById(page.medias, req.params.mediaId)

    let updateParams = { }

    console.log(`Uploaded: ${uploadedFile.originalFilename}`)

    if (media.type === 'image') {
      uploadedFile.order = 0
      updateParams = {
        imageFile: uploadedFile
      }
    } else if (media.type === 'gallery') {
      uploadedFile.order = media.imageFiles.length
      updateParams = {
        imageFiles: media.imageFiles.concat([uploadedFile])
      }
    }

    // Update the media
    media = updateMediaById(page.medias, req.params.mediaId, updateParams)

    res.json(media)
  })

  req.pipe(busboy)
})

app.put('/pages/:pageId/medias/:mediaId/files/sort',
  urlEncoder, jsonParser, (req, res, next) => {
    // Find the page
    const page = findPageById(req.params.pageId)

    // Find the media
    let media = findMediaById(page.medias, req.params.mediaId)
    const sortedIds = req.body.sortedIds
    const dictionary = []
    sortedIds.forEach((id, i) => dictionary[id] = i)
    media.imageFiles.forEach((file, i) => file.order = dictionary[file.id])

    res.json(media)
  })

app.put('/pages/:pageId/medias/:mediaId/files/:fileId', urlEncoder, jsonParser, (req, res, next) => {
  // Find the page
  const page = findPageById(req.params.pageId)
  const media = findMediaById(page.medias, req.params.mediaId)

  // Update the file
  // const file = updateFileById(media.imageFiles, req.params.fileId, req.body)
  updateFileById(media.imageFiles, req.params.fileId, req.body)

  // Simulate latency
  setTimeout(() => {
    res.json(media)
  }, 500)
})

app.delete('/pages/:pageId/medias/:mediaId/files/:fileId', (req, res, next) => {
  // Find the page
  const page = findPageById(req.params.pageId)
  const media = findMediaById(page.medias, req.params.mediaId)

  // Delete the media
  // const file = deleteFileById(media, media.imageFiles, req.params.fileId)
  deleteFileById(media, media.imageFiles, req.params.fileId)

  // Simulate latency
  setTimeout(() => {
    res.json(media)
  }, 500)
})

app.get('/pages.json', (req, res) => res.sendFile(`${__dirname}/pages.json`))

app.use('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

app.listen(port, error => {
  if (error) return console.error(error)
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
})
