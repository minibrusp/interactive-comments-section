const Reply = require('../models/replyModel')
const Comment = require('../models/commentModel')
const mongoose = require('mongoose')


// create a reply
const createReply = async (req, res) => {
  const { id } = req.params // comment id
  const { user, content, replyingTo } = req.body

  if(!content) {
    return res.status(400).json({ error: 'Please fill in your reply'})
  }

  try {

    let newReply = await Reply.create({
      content: content,
      score: 0,
      replyingTo: replyingTo,
      user: user,
    })

    let foundComment = await Comment.findOneAndUpdate(
      { _id: id },
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

  const { id } = req.params //reply ID

  try {

    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("No Such Reply Exist")
    }

    let foundReply = await Reply.findOneAndUpdate(
      { _id: id },
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

  const { id } = req.params // reply ID

  try {

    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("No Such Reply Exist")
    }

    let foundReply = await Reply.findOneAndDelete({_id: id})
    
    if(!foundReply) {
      throw Error("No Such Reply Exist")
    }

    res.status(200).json(foundReply)

  } catch(error) {
    res.status(404).json({error: error.message})
  }

}

module.exports = { createReply, updateReply, deleteReply }