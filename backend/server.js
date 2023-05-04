const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const commentRoutes = require("./routes/comments")
const userRoutes = require("./routes/users")
const replyRoutes = require("./routes/reply")
const fileUpload = require("express-fileupload")

const app = express()

// middlewares 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true,
  uriDecodeFileNames: true,
  safeFileNames: true,
  preserveExtension: 4,
  limitHandler: (req, res, next) => {
    return res.status(400).json({message: "Avatar's file size limit has been reached"})
  }
}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/users', userRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/replies', replyRoutes)


// connect to db & listen for request 
mongoose.connect("mongodb://127.0.0.1:27017/commentsDB", { useNewUrlParser: true })
  .then(() => {
    app.listen(4001, () => console.log("Successfully connected to the Database and server now listening on port 4001"))
  })
  .catch(error => console.log(error))

