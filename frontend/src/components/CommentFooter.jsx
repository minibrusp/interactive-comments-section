/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// assets/icons 
import replyBtn from '../assets/images/icon-reply.svg'
import deleteBtn from '../assets/images/icon-delete.svg'
import editBtn from '../assets/images/icon-edit.svg'

// hooks
import useModal from '../hooks/useModal'
import useComment from '../hooks/useComment'
import { useEffect } from 'react'

export default function CommentFooter({
  id,
  commentThreadId,
  replyingTo,
  content, 
  currentContent,
  setCurrentContent,
  isCurrent,
  isEditing,
  setIsEditing,
  setIsReplying,
  setTextAreaFirstClick,
  setTextAreaLoader
 }) {

  const { openModal } = useModal()
  const { changeComment, editReply, error, isLoading } = useComment()
  
  useEffect(() => {
    if(isLoading) return
    if(error) return

    setIsEditing(false)
    setTextAreaFirstClick(true)
    setTextAreaLoader(false)
    setCurrentContent(content)

  }, [isLoading])

  const handleReplyClick = () => {
    setIsReplying(true)
  }
  
  const handleEditClick = () => {

    setIsEditing(true)
    if(replyingTo) {
      setCurrentContent(prevState => `@${replyingTo} ` + prevState)
    }
  }

  const handleUpdateClick = () => {
    setTextAreaLoader(true)

    if(replyingTo) {
      // console.log('Replying Toooooo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      // console.log('commentThreadId: ', commentThreadId)
      // console.log('id: ', id)
      // console.log('currentContent: ', currentContent)
      setCurrentContent(prevState => prevState.replace(`@${replyingTo} `, ''))
      editReply(commentThreadId, id, currentContent, setIsEditing)
    }
    if(!replyingTo) {
      setCurrentContent(prevState => prevState.replace(`@${replyingTo} `, ''))
      changeComment(id, currentContent, setIsEditing)
    }
    
    // setIsEditing(false)
    // setTextAreaFirstClick(true)
    // setCurrentContent(content)
    
  }

  const handleDeleteComment = () => {

    if(replyingTo) {
      openModal(commentThreadId, id)
    }

    if(!replyingTo) {
      openModal(id)
    }
  }

  return (
    <>
      <div className="comment__footer grid-in-replybtn self-center flex flex-row gap-4 justify-self-end md:self-start">


      {
        !isCurrent && (
          <button 
            className="comment__footer__btn-reply flex justify-center items-center gap-2 hover:opacity-40"
            onClick={handleReplyClick}
          >
            <img src={replyBtn} alt="reply button" />
            <span className='text-primary-moderate-blue font-medium'>Reply</span>
          </button>
        )
      }

      {
        (isCurrent) && (!isEditing) 
          ? (
              <>
                <button
                  disabled={isLoading} 
                  className="comment__footer__btn-delete flex justify-center items-center gap-2 hover:opacity-40"
                  onClick={handleDeleteComment}
                >
                  <img src={deleteBtn} alt="delete button" />
                  <span className='text-primary-soft-red font-medium'>Delete</span>
                </button>
                <button 
                  className="comment__footer__btn-edit flex justify-center items-center gap-2 hover:opacity-40"
                  onClick={handleEditClick}
                >
                  <img src={editBtn} alt="delete button" />
                  <span className='text-primary-moderate-blue font-medium'>Edit</span>
                </button>
              </>
            ) 
          : null
      }
      </div>

      <div className="comment__footer grid-in-replybtn self-center flex flex-row gap-4 justify-self-end md:self-start md:grid-in-submitBtn">

      {
        (isCurrent) && (isEditing)
        && (
            <button
              disabled={isLoading} 
              className={`comment__footer__btn-update grid-in-submitBtn self-center justify-self-end text-base font-medium uppercase text-neutral-white ${isLoading ? 'bg-neutral-grayish-blue' : 'bg-primary-moderate-blue' } rounded-lg py-3 px-4 max-w-[107px] min-w-[94.55px] max-h-[48px] hover:opacity-40 md:min-w-[102.55px] md:px-5`}
              onClick={handleUpdateClick}
            >
              { !isLoading && (
                <span>Update</span>
              )}
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

          )
      }


      </div>
    </>
  )
}
