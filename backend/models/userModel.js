const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const path = require('path')
const { uploadImageCloudinary } = require('../cloudinary/utils')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar : String
})

// static signup method 
userSchema.statics.signup = async function(req, res, username, password, avatar) {
  // validation 
  if(!username || !password || !avatar) {
    throw Error("All fields must be filled")
  }

  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ username })

  if (exists) {
    throw Error("Username already in use")
  }

  const extensionName = path.extname(avatar.name)
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp']

  if(!allowedExtensions.includes(extensionName)) {
    throw Error('Invalid image file extension, accepted extensions .png .jpg .jpeg .webp ')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const result = await uploadImageCloudinary(avatar.tempFilePath)

  // console.log(result.secure_url)

  const user = await this.create({ 
    username: username.replace(" ", ""),
    password: hash,
    avatar: result.secure_url,
  })

  return user
}


// static login method
userSchema.statics.login = async function(username, password) {
  if(!username || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ username })

  if(!user) {
    throw Error("Incorrect username")
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw Error("Incorrect password")
  }

  return user
}

module.exports = mongoose.model('User', userSchema)