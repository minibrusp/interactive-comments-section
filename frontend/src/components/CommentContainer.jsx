/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import useCommentContext from "../hooks/useCommentContext";

import Comment from "./Comment";
import RepliesContainer from "./RepliesContainer";

const CommentContainer = () => {
  const { comments, dispatch } = useCommentContext()

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/comments')
        const json = await response.json()
        if(response.ok) {
          dispatch({ type: 'SET_COMMENTS', payload: json})
        }
      } catch(err) {
        throw Error("Could not connect to the API")
      }

      

    }

    fetchComments()
      .catch(error => console.log(error))
    }, [dispatch])


  return (
    <div className="comment__container m-4 mb-4 relative overflow-y-hidden max-w-[733px] mx-auto">
      { comments && 
          comments.map((comment) => (
            <div key={comment.id}>
              <Comment 
                key={comment.id}
                id={comment.id}
                commentThreadId={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                user={comment.user}
                replies={comment.replies}
              />
              <RepliesContainer commentThreadId={comment.id} key={comment.content} replies={comment.replies}/>
            </div>
          ))
      }
      
    </div>
  )
}

// export default memo(CommentContainer)
export default CommentContainer
