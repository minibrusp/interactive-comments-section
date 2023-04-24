const express = require('express')

const router = express.Router()

// READ all users
router.get('/', (req, res) => {
  res.status(200).json({mssg: "READ ALL USERS"})
})

// READ a user
router.get('/:id', (req, res) => {
  res.status(200).json({mssg: "READ A USER"})
})

module.exports = router