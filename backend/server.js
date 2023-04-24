const express = require("express")
const mongoose = require("mongoose")
const commentRoutes = require("./routes/comments")
const userRoutes = require("./routes/users")
const Comment = require('./models/commentModel')
const User = require('./models/userModel')
const Reply = require('./models/replyModel')

const app = express()

// middlewares 
app.use(express.json())
app.use((req, res, next) => {
  // console.log(req.path, req.method)
  next()
})

// */api/comments GET, POST
// */api/comments/:id PATCH DELETE
// */api/comments/:id/replies/:id PATCH DELETE
// */api/users/:id GET
// if can POST PATCH 




// <--- testing models architecture1
app.get("/", async (req, res) => {
  try {
    // const foundComments = await Comment.find().populate(
    //   "user", { "username": 1, "_id": 1},
    // ) 
    const foundComments = await Comment.find()
      .populate({
      path: "replies",
      populate: {
        path: "user replyingTo"
      }
      })
      .populate('user') 
    res.status(200).json({mssg: "Welcome to the api", comments: foundComments})
  } catch(error) {
    res.status(404).json({errors: error})
  }
})
app.post("/", async (req, res) => {

  try {
    const Rusty = await User.create({ 
      username: "Rusty Bently"
    })
    const Barbie = await User.create({ 
      username: "Barbie Doll"
    })
    const newReply = await Reply.create({
      content: "Hi guys watchout sa inyo :))",
      score: 0,
      replyingTo: Rusty,
      user: Barbie,
    })
    const newComment =  await Comment.create({
      content: "Hi blog welcome to my guys :))",
      score: 0,
      user: Rusty,
      replies: [newReply]
    })
    newComment.save()
    res.status(201).json({mssg: "Welcome to the api", response: newComment})
  } catch(e) {
    res.status(400).json({error: "Could not create new comment"})
  }
  
})

// end of testing --->

// routes
app.use('/api/comments', commentRoutes)
app.use('/api/users', userRoutes)


// connect to db & listen for request 
mongoose.connect("mongodb://127.0.0.1:27017/commentsDB", { useNewUrlParser: true })
  .then(() => {
    app.listen(4001, () => console.log("Successfully connected to the Database and server now listening on port 4001"))
  })
  .catch(error => console.log(error))

