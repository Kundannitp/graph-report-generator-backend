const path = require('path')
require('dotenv').config({
    debug: true,
    path: path.resolve(__dirname, './.env')
})
const http = require('http')
const app = require('./app')

const PORT = process.env.PORT || 3001


http.createServer(app).listen(PORT,() => {
    console.log('app running on port '+PORT)
})
