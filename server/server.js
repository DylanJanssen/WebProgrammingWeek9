// setup modules
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient

// import all the data access files
const create = require('./data-access/create.js')
const add = require('./data-access/add.js')
const remove = require('./data-access/remove.js')
const update = require('./data-access/update')
const read = require('./data-access/read.js')

// mongo variables
// Connection URL
const url = 'mongodb://localhost:27017'
// Database Name
const dbName = 'week9'
// Collection Name
const collectionName = 'products'
let client = undefined
let db = undefined


// Setup Express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../dist/week9/')))
app.use(express.json())

// connect to the server
async function connect() {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    console.log('Successfully connected to the server')
    db = client.db(dbName)
    // create the collection
    await create.collection(db, collectionName)
    await require('./routes/getProducts.js')(app, db, collectionName, read)
    await require('./routes/addProduct.js')(app, db, collectionName, add)
    await require('./routes/removeProduct.js')(app, db, collectionName, remove)
    await require('./routes/updateProduct.js')(app, db, collectionName, update)
}

require('./listen.js')(http)
connect()