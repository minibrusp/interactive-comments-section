/* eslint-disable react/prop-types */
import { useState } from 'react'
import  useUserContext  from '../hooks/useUserContext'
import useComment from '../hooks/useComment'

export default function CommentForm({ 
  commentThreadId, 
  recipientId, 
  commentThreadUserId, 
  replyingTo, 
  btnText, 
  setIsReplying 
}) {

  const { currentUser } = useUserContext()
  const [ comment, SetComment ] = useState(replyingTo && `@${replyingTo} `)
  const { createComment, replyToComment, replyToReply, error, isLoading, setError } = useComment()
  const type = commentThreadId === recipientId ? 'reply' : 'replyToReply'

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!currentUser.token) {
      console.log('Not Authenticated')
      setError("User not authenticated, Please login or register an account")
      return
    }

    if(!recipientId) {
      createComment(comment)
    }

    // console.log('COMMENT FORMM ~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    // console.log('Type: ', type)
    // console.log('Recipient ID: ', recipientId)
    // console.log('commentThreadID: ', commentThreadId)
    // console.log('CommentThread User: ', commentThreadUserId)

    if(recipientId && type === 'reply') {
      replyToComment(recipientId, comment.replace(`@${replyingTo} `, ''), commentThreadUserId)
      SetComment(`@${replyingTo} `)
      setIsReplying(false)
    }
    if(recipientId && type === 'replyToReply') {
      replyToReply(commentThreadId, comment.replace(`@${replyingTo} `, ''), commentThreadUserId)
      SetComment(`@${replyingTo} `)
      setIsReplying(false)
    }
    SetComment('')
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
          className="commentform__form__content resize-none text-neutral-dark-blue w-full min-h-[7rem] p-3 mb-4 border border-neutral-light-gray rounded-lg placeholder:text-neutral-grayish-blue focus-visible:outline-none focus-visible:border-neutral-grayish-blue grid-in-text hover:cursor-pointer hover:border-neutral-grayish-blue md:min-h-[6rem]"
          placeholder={'Add a comment...'}
          name="newComment"
          onChange={(e) => SetComment(e.target.value)}
          value={comment}
        />
        <div className='comment__avatar grid-in-profile self-center'>
          <img className='h-8 w-8' src={currentUser?.avatar} alt="user image avatar" />
        </div>
        
        <button 
          disabled={isLoading}
          className='commentform__form__btn grid-in-submitBtn self-center justify-self-end text-base font-medium uppercase text-neutral-white bg-primary-moderate-blue rounded-lg py-3 px-4 max-w-[107px] hover:opacity-40 md:px-7'
        >
          { !isLoading && <span>{btnText}</span> }
          { isLoading && <span>Loading....</span> }
        </button>
      </form>
    </div>
  )
}
