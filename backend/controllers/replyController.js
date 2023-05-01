const Reply = require('../models/replyModel')
const Comment = require('../models/commentModel')
const mongoose = require('mongoose')


// create a reply
const createReply = async (req, res) => {
  const { commentId } = req.params // comment id
  const { user, content, replyingTo } = req.body

  if(!content) {
    return res.status(400).json({ error: 'Please fill in your reply'})
  }

  

  try {

    if(!mongoose.Types.ObjectId.isValid(commentId)) {
      throw Error("No Such Comment Exist")
    }

    let newReply = await Reply.create({
      content: content,
      score: 0,
      replyingTo: replyingTo,
      user: user,
    })

    let foundComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies: newReply._id}},
      { new: true }
    )
      .populate({
        path: "replies",
        populate: {
          path: "user replyingTo",
          select: "username avatar"
        }
        })
      .populate({
        path: "user",
        select: "username avatar"
      }) 
      

    res.status(200).json(foundComment)

  } catch(error) {
    res.status(400).json({error: error.message})
  }

}

// update a reply 
const updateReply = async (req, res) => {

  const { replyId } = req.params //reply ID

  try {

    if(!mongoose.Types.ObjectId.isValid(replyId)) {
      throw Error("No Such Reply Exist")
    }

    let foundReply = await Reply.findOneAndUpdate(
      { _id: replyId },
      { ...req.body },
      { new: true }
    )

    if(!foundReply) {
      throw Error("No Such Reply Exist")
    }

    res.status(200).json(foundReply)

  } catch(error) {
    res.status(400).json({error: error.message})
  }

}

// delete a reply 
const deleteReply = async (req, res) => {

  const { commentId, replyId } = req.params

  try {

    if(!mongoose.Types.ObjectId.isValid(replyId)) {
      throw Error("No Such Reply Exist")
    }

    let foundReply = await Reply.findOneAndDelete({_id: replyId})
    
    if(!foundReply) {
      throw Error("No Such Reply Exist")
    }

    let foundComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $pull: { replies: foundReply._id}},
      { new: true }
    )
      .populate({
        path: "replies",
        populate: {
          path: "user replyingTo",
          select: "username avatar"
        }
        })
      .populate({
        path: "user",
        select: "username avatar"
      })

    if(!foundComment) {
      throw Error("No Such Comment Exist")
    }

    res.status(200).json(foundComment)

  } catch(error) {
    res.status(404).json({error: error.message})
  }

}

module.exports = { createReply, updateReply, deleteReply }