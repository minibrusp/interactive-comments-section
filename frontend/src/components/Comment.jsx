/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'

// Components
import CommentForm from './CommentForm'
import CommentHeading from './CommentHeading'
import CommentContent from './CommentContent'
import CommentVotes from './CommentVotes'

// hooks
import useUserContext from '../hooks/useUserContext'
import CommentFooter from './CommentFooter'


export default function Comment({id, commentThreadId, content, createdAt, score, user, replyingTo}) {
  const { currentUser } = useUserContext()

  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState(content)
  const isCurrent = currentUser?.username === user?.username ? true : false
  const [textAreaFirstClick, setTextAreaFirstClick] = useState(true)


  return (
    <>
      <div className="comment bg-neutral-white p-4 my-4 rounded-lg grid grid-areas-comment-slim shadow-sm last-of-type:mb-0 md:grid-areas-comment-large md:gap-x-6 md:px-7 md:py-6 md:grid-cols-[39px_1fr_auto]">
        <CommentHeading 
          user={user}
          isCurrent={isCurrent}
          createdAt={createdAt}
        />

        <CommentContent 
          isEditing={isEditing}
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
          replyingTo={replyingTo}
          textAreaFirstClick={textAreaFirstClick}
          setTextAreaFirstClick={setTextAreaFirstClick}
        />
        

        <CommentVotes 
          id={id}
          commentThreadId={commentThreadId}
          score={score}
          replyingTo={replyingTo}
        />

        <CommentFooter 
          id={id}
          commentThreadId={commentThreadId}
          replyingTo={replyingTo}
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
          isCurrent={isCurrent}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsReplying={setIsReplying}
          setTextAreaFirstClick={setTextAreaFirstClick}
        />
        
        
      </div>

      

      {
        isReplying && (
          <CommentForm commentThreadId={commentThreadId} recipientId={id} btnText="reply" replyingTo={user?.username} setIsReplying={setIsReplying} />
        )
      }

    </>
  )
}
