/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import useCommentContext from "../hooks/useCommentContext";

import Comment from "./Comment";
import RepliesContainer from "./RepliesContainer";

const CommentContainer = () => {
  const { comments, dispatch } = useCommentContext()
  const [ isLoading, setIsLoading ] = useState(false)

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/comments')
        const json = await response.json()
        if(response.ok) {
          setIsLoading(false)
          dispatch({ type: 'SET_COMMENTS', payload: json})
        }
      } catch(err) {
        setIsLoading(false)
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

      {
        isLoading && (
          <div className="comment__container__loader block text-center mx-auto">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-moderate-blue motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>

          </div>
        )
      }

      {
        (!comments && !isLoading) && (
          <div className="comment__container__loader block text-center mx-auto my-4">
            <span>no comments to show</span>
          </div>
        )
      }
      
    </div>
  )
}

// export default memo(CommentContainer)
export default CommentContainer
