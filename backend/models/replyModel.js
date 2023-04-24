const mongoose = require('mongoose')

const Schema = mongoose.Schema

const replySchema = new Schema({
  content: {
    type: String,
    require: true
  },
  score: Number,
  replyingTo: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
}, { timestamps: true })

module.exports = mongoose.model('Reply', replySchema)