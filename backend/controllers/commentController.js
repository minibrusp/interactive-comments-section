const Comment = require('../models/commentModel')
const mongoose = require('mongoose')

// get all comments
const getComments = async (req, res) => {

  try {
    const foundComments = await Comment.find()
      .populate({
        path: "replies",
        populate: {
          path: "user replyingTo"
        }
        })
      .populate({
        path: "user",
        select: "username avatar"
      }) 
    res.status(200).json(foundComments)
  } catch(error) {
    res.status(404).json({error: error.message})
  }

}

// get a single comment
const getComment = async (req, res) => {

  const { id } = req.params

  try {

    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("No Such Comment")
    }

    const foundComment = await Comment.findById(id)
      .populate({
        path: "replies",
        populate: {
          path: "user replyingTo"
        }
        })
      .populate({
        path: "user",
        select: "username avatar"
      }) 

    if(!foundComment) {
      throw Error("No Such Comment")
    }

    res.status(200).json(foundComment)

  } catch(error) {
    res.status(404).json({error: error.message})
  }

}

// create a new comment
const createComment = async (req, res) => {

  const { userId, content } = req.body

  if(!content) {
    return res.status(400).json({ error: 'Please fill in your comment'})
  }

  try {
    let newComment = await Comment.create({
      content: content,
      score: 0,
      user: userId,
      replies: []
    })

    newComment = await newComment.populate({
        path: "user",
        select: "username avatar"
      }) 

    res.status(200).json(newComment)

  } catch(error) {
    res.status(400).json({error: error.message})
  }

}

// update a comment 
const updateComment = async (req, res) => {
  const { id } = req.params

  try {

    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("No Such Comment")
    }

    const newComment = await Comment.findOneAndUpdate({_id: id}, {
      ...req.body
    })

    let foundComment = await Comment.findOne({_id: id})

    if(foundComment.replies.length !== 0) {
      foundComment = await foundComment
        .populate({
          path: "replies",
          populate: {
            path: "user replyingTo"
          }
          })
        .populate({
          path: "user",
          select: "username avatar"
        })
    } else {
      foundComment = await foundComment
        .populate({
          path: "user",
          select: "username avatar"
        })
    }

    res.status(200).json(foundComment)

  } catch(error) {
    res.status(404).json({error: error.message})
  }
}

// delete a comment 
const deleteComment = async (req, res) => {
  const { id } = req.params 

  try {

    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("No Such Comment")
    }

    const foundComment = await Comment.findOneAndDelete({_id: id})

    res.status(200).json(foundComment)
    
  } catch(error) {
    res.status(404).json({error: error.message})
  }
}


module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
}

