const express = require('express')
const port = 4000
const server = express()

const UserRouter = require('./users/userRouter')
const PostRouter = require('./posts/postRouter')

server.use(express.json())

//custom middleware

const middlewares = require('./middleware')
server.use(middlewares.logger)

//Routes
server.use('/api/users', UserRouter)
server.use('/api/posts', PostRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

server.listen(port, () => {
  console.log(`listen from port ${port}...`)
})
module.exports = server