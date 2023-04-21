import useUserContext from "./useUserContext"
import useCommentContext from "./useCommentContext"


export default function useCreateComment() {

  const { currentUser } = useUserContext()
  const { dispatch } = useCommentContext()

  const createComment = (content) => {
    const newComment = {
      content: content,
      id: new Date(),
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


  
  return { createComment }
}
