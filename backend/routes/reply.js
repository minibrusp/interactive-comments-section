const express = require('express')
const { createReply, updateReply, deleteReply } = require('../controllers/replyController')

const router = express.Router()

// CREATE a reply
router.post('/:id', createReply)

// UPDATE a reply
router.patch('/:id', updateReply)

// DELETE a reply
router.delete('/:id', deleteReply)


module.exports = router