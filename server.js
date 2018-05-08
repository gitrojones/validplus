const express = require('express')
const path = require('path')
const server = express()

server.use(express.static('dist'))
server.listen(3000, () => console.log('Test app listening on port 3000!'))
