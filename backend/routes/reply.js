const express = require('express')
const { createReply, updateReply, deleteReply } = require('../controllers/replyController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// CREATE a reply
router.post('/:commentId', createReply)

// UPDATE a reply
router.patch('/:replyId', updateReply)

// DELETE a reply
router.delete('/:commentId/:replyId', deleteReply)


module.exports = router