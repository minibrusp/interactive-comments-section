import useUserContext from "./useUserContext"
import useCommentContext from "./useCommentContext"
import {v1 as uuidv1 } from 'uuid'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


export default function useComment() {

  const { currentUser } = useUserContext()
  const { dispatch } = useCommentContext()

  const createComment = (content) => {
    const newComment = {
      content: content,
      id: uuidv1(),
      createdAt: `${formatDistanceToNow(new Date(), { addSuffix: true })}`,
      score: 0,
      user: {
        'image': {
          "webp": currentUser.image.webp,
        },
        username: currentUser.username
      },
      replies: []
    }

    dispatch({ type: 'CREATE_COMMENT', payload: newComment})

  }

  const changeComment = (id, newContent) => {
    dispatch({ type: 'EDIT_COMMENT', payload: { id: id, content: newContent}})
  }

  const deleteComment = (id) => {
    dispatch({ type: 'DELETE_COMMENT', payload: { id: id } })
  }

  const upvoteComment = (id) => {
    dispatch({ type: 'UPVOTE_COMMENT', payload: { id: id } })
  }
  const downvoteComment = (id) => {
    dispatch({ type: 'DOWNVOTE_COMMENT', payload: { id: id } })
  }

  // REPLIES 

  const replyToComment = (id, content, replyingTo) => {
    const newReply = {
      content: content,
      id: uuidv1(),
      createdAt: `${formatDistanceToNow(new Date(), { addSuffix: true })}`,
      score: 0,
      replyingTo: replyingTo,
      user: {
        'image': {
          "webp": currentUser.image.webp,
        },
        username: currentUser.username
      }
    }

    dispatch({ type: 'REPLY_COMMENT', payload: { id: id, reply: newReply} })
  }
  
  const editReply = (id, replyId, content) => {
    dispatch({ type: 'EDIT_REPLY', payload: { id: id, content: content, replyId: replyId } })
  }

  const deleteReply = (id, replyId) => {
    dispatch({ type: 'DELETE_REPLY', payload: { id: id, replyId: replyId } })
  }

  const upvoteReply = (id, replyId) => {
    dispatch({ type: 'UPVOTE_REPLY', payload: { id: id, replyId: replyId } })
  }

  const downvoteReply = (id, replyId) => {
    dispatch({ type: 'DOWNVOTE_REPLY', payload: { id: id, replyId: replyId } })
  }

  const replyToReply = (id, content, replyingTo) => {
    const newReply = {
      content: content,
      id: uuidv1(),
      createdAt: `${formatDistanceToNow(new Date(), { addSuffix: true })}`,
      score: 0,
      replyingTo: replyingTo,
      user: {
        'image': {
          "webp": currentUser.image.webp,
        },
        username: currentUser.username
      }
    }

    dispatch({ type: 'REPLY_REPLY', payload: { id: id, reply: newReply} })
  }


  
  return { 
    createComment, 
    changeComment, 
    deleteComment, 
    upvoteComment, 
    downvoteComment, 
    replyToComment, 
    editReply,
    deleteReply,
    upvoteReply,
    downvoteReply,
    replyToReply 
  }
}
