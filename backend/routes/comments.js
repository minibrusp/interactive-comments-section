const express = require('express')

const router = express.Router()

// READ all comments
router.get('/', (req, res) => {
  res.status(200).json({mssg: "READ ALL COMMENTS"})
})

// CREATE a comment
router.post('/', (req, res) => {
  res.status(200).json({mssg: "CREATE A COMMENT"})
})

// READ a comment
router.get('/:id', (req, res) => {
  res.status(200).json({mssg: "READ A COMMENT"})
})

// UPDATE a comment
router.patch('/:id', (req, res) => {
  res.status(200).json({mssg: "UPDATE A COMMENT"})
})

// DELETE a comment
router.delete('/:id', (req, res) => {
  res.status(200).json({mssg: "DELETE A COMMENT"})
})

module.exports = router