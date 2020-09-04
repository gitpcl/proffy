// Server
const express = require('express')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

// Configure nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Start and configuratino of the server
server

// Receive data from req.body
.use(express.urlencoded({extended: true}))

// configure static files (css, scripts, images)
.use(express.static('public'))

// Paths for the application
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

// Start server
const PORT = process.env.PORT || 5500
server.listen(PORT, () => {
    console.log(`App server listening on PORT: ${PORT}`)
})