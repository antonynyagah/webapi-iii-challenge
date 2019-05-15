const express = require('express')
const port = 8008
const server = express()

server.use(express.json())

//custom middleware

const middlewares = require('./middleware')
server.use(middlewares.logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

server.listen(port, () => {
  console.log(`listen from port ${port}...`)
})
module.exports = server