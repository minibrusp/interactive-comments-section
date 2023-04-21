import { useEffect } from "react";
import useCommentContext from "../hooks/useCommentContext";

import Comment from "./Comment";
import RepliesContainer from "./RepliesContainer";

export default function CommentContainer() {
  const { comments, dispatch } = useCommentContext()
  
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('http://localhost:3000/comments')
      const json = await response.json()

      if(response.ok) {
        dispatch({ type: 'SET_COMMENTS', payload: json})
      }

    }

    fetchComments()
      .catch(error => console.log(error))
    }, [dispatch])


  return (
    <div className="comment__container m-4 mb-4 relative overflow-hidden">
      { comments && 
          comments.map(comment => (
            <div key={comment.id}>
              <Comment 
                key={comment.id}
                id={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                user={comment.user}
                replies={comment.replies} 
              />
              <RepliesContainer key={comment.content} replies={comment.replies}/>
            </div>
          ))
      }
      
    </div>
  )
}
