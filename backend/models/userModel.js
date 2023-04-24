const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  image: {
    webp: {
      data: Buffer,
      contentType: String
    }
  } 
})

module.exports = mongoose.model('User', userSchema)