/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react'

import useUserContext  from '../hooks/useUserContext'
import useComment from '../hooks/useComment'

export default function CommentForm({ 
  commentThreadId, 
  recipientId, 
  commentThreadUserId, 
  replyingTo, 
  btnText, 
  setIsReplying, 
}) {

  const { currentUser } = useUserContext()
  const [ comment, setComment ] = useState(replyingTo && `@${replyingTo} `)
  const { createComment, replyToComment, replyToReply, error, isLoading } = useComment()
  const type = commentThreadId === recipientId ? 'reply' : 'replyToReply'

  const handleSubmit = (e) => {

    
    // console.log('COMMENT FORMM ~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    // console.log('Type: ', type)
    // console.log('Recipient ID: ', recipientId)
    // console.log('commentThreadID: ', commentThreadId)
    // console.log('CommentThread User: ', commentThreadUserId)

    e.preventDefault()

    if(!recipientId) {
      createComment(comment, setComment)
      return
    }

    if(recipientId && type === 'reply') {
      replyToComment(recipientId, comment.replace(`@${replyingTo} `, ''), commentThreadUserId, setIsReplying, setComment)
      // setComment(`@${replyingTo} `)
      return
    }
    if(recipientId && type === 'replyToReply') {
      replyToReply(commentThreadId, comment.replace(`@${replyingTo} `, ''), commentThreadUserId, setIsReplying, setComment)
      // setComment(`@${replyingTo} `)
      return
    }
  }

  return (
    <div className="commentform__container bg-neutral-white p-4 my-4 rounded-lg max-w-[733px] mx-auto shadow-sm">
      {error && <span className="block text-sm text-primary-soft-red font-bold py-2 ">{error}</span>}
      <form 
        className="grid commentform__form grid-areas-form-slim mb-1 md:grid-areas-form-large  md:grid-cols-[39px_1fr_auto] md:gap-x-6" 
        action="/" 
        method='POST'
        onSubmit={handleSubmit}
        >
        <textarea 
          disabled={isLoading}
          className="commentform__form__content resize-none text-neutral-dark-blue w-full min-h-[7rem] p-3 mb-4 border border-neutral-light-gray rounded-lg placeholder:text-neutral-grayish-blue focus-visible:outline-none focus-visible:border-neutral-grayish-blue grid-in-text disabled:bg-neutral-light-gray disabled:text-neutral-grayish-blue disabled:cursor-wait hover:cursor-pointer hover:border-neutral-grayish-blue md:min-h-[6rem]"
          placeholder={'Add a comment...'}
          name="newComment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <div className='comment__avatar grid-in-profile self-center'>
          <img className='h-8 w-8 rounded-full' src={currentUser?.avatar} alt="user image avatar" />
        </div>
        
        <button 
          disabled={isLoading}
          className={`commentform__form__btn grid-in-submitBtn self-center justify-self-end text-base font-medium uppercase text-neutral-white ${isLoading ? 'bg-neutral-grayish-blue' : 'bg-primary-moderate-blue'} rounded-lg py-3 px-4 max-w-[107px] min-w-[74.8px] hover:opacity-40 md:px-7`}
        >
          { !isLoading && <span>{btnText}</span> }
          {/* { isLoading && <span>Loading....</span> } */}
          { isLoading && (
            <div className="commentform__form__btn__loader block text-center mx-auto">
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-light-gray/30 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>

            </div>
          ) }
        </button>
      </form>
    </div>
  )
}
