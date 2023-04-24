const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String,
    require: true
  },
  score: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  replies: [{
    type: mongoose.Types.ObjectId,
    ref: "Reply"
  }]
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)