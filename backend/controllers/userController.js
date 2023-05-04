const User = require('../models/userModel')

// Register a new user
const registerUser = async (req, res) => {
  
  try {
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ mssg: 'No files were uploaded.' });
    }

    const avatar = req.files.avatar
    const username = req.body.username.toLowerCase().replace(" ", "")
    const password = req.body.password

    console.log(avatar, username, password)
    

    const newUser = await User.signup(req, res, username, password, avatar)

    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      avatar: newUser.avatar
    })

  } catch(err) {
    res.status(400).json({error: {error: err, message: err.message} })
  }

}

// login a user
const loginUser = async (req, res) => {

  try {
    const username = req.body.username?.toLowerCase().replace(" ", "")
    const password = req.body.password

    res.status(200).json({ mssg: "Successfully logged in", input: {username, password}})

    // const foundUser = await User.login(username, password)

    // res.status(200).json({
    //   id: foundUser._id,
    //   username: foundUser.username, 
    //   avatar: foundUser.avatar,
    // })

  } catch(error) {
    res.status(400).json({error: error.message})
  }

}

module.exports = { registerUser, loginUser }