const express = require('express')
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// READ all comments
router.get('/', getComments)

router.use(requireAuth)

// READ a comment
router.get('/:id', getComment)

// CREATE a comment
router.post('/', createComment)

// UPDATE a comment
router.patch('/:id', updateComment)

// DELETE a comment
router.delete('/:id', deleteComment)

module.exports = router