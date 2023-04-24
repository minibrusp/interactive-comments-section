const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// */api/comments GET, POST
// */api/comments/:id PATCH DELETE
// */api/comments/:id/replies/:id PATCH DELETE
// */api/users/:id GET
// if can POST PATCH 


app.get("/", (req, res) => {
  res.status(200).json({mssg: "Welcome to the api"})
})


mongoose.connect("mongodb://127.0.0.1:27017/commentsDB", { useNewUrlParser: true })
  .then(() => {
    app.listen(4001, () => console.log("Successfully connected to the Database and server now listening on port 4001"))
  })
  .catch(error => console.log(error))

