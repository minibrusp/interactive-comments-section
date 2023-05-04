const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = _id => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '2d'})
}

// Register a new user
const registerUser = async (req, res) => {
  
  let emptyFields = []
  
  try {
    
    if (!req.files || Object.keys(req.files).length === 0) { emptyFields.push('avatar') }
    
    const username = req.body.username.toLowerCase().replace(" ", "")
    const password = req.body.password

    if(!username) { emptyFields.push('username') }
    if(!password) { emptyFields.push('password') }

    if(emptyFields.length > 0) {
      return res.status(400).json({ error: { message: 'Please fill in all the fields', emptyFields}})
    }

    const avatar = req.files.avatar
    
    const newUser = await User.signup(req, res, username, password, avatar)

    const token = createToken(newUser._id)

    res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        avatar: newUser.avatar,
        token: token
    })

  } catch(error) {
    res.status(400).json({error: {error: error, message: error.message} })
  }

}

// login a user
const loginUser = async (req, res) => {

  let emptyFields = []

  try {
    const username = req.body.username?.toLowerCase().replace(" ", "")
    const password = req.body.password

    if(!username) { emptyFields.push('username') }
    if(!password) { emptyFields.push('password') }

    if(emptyFields.length > 0) {
      return res.status(400).json({ error: { message: 'Please fill in all the fields', emptyFields}})
    }

    const foundUser = await User.login(username, password)

    const token = createToken(foundUser._id)

    res.status(200).json({
        id: foundUser._id,
        username: foundUser.username,
        avatar: foundUser.avatar,
        token: token
    })

  } catch(error) {
    res.status(400).json({error: {error: error, message: error.message} })
  }

}

module.exports = { registerUser, loginUser }