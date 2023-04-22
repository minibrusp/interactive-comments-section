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


  
  return { createComment, changeComment, deleteComment, upvoteComment, downvoteComment }
}
