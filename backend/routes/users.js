const express = require('express')
const User = require('../models/userModel')
const { registerUser, loginUser } = require('../controllers/userController')


const router = express.Router()

// READ all users
router.get('/', async (req, res) => {
  
  try {
    const foundUsers = await User.find()
    res.status(200).json({users: foundUsers})
  } catch(err) {
    res.status(404).json({error: err, message: err.message})
  }

})

// Register a new user
router.post('/register', registerUser)

// login a user
router.post('/login', loginUser)

module.exports = router