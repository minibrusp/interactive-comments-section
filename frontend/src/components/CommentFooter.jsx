/* eslint-disable react/prop-types */

// assets/icons 
import replyBtn from '../assets/images/icon-reply.svg'
import deleteBtn from '../assets/images/icon-delete.svg'
import editBtn from '../assets/images/icon-edit.svg'

// hooks
import useModal from '../hooks/useModal'
import useComment from '../hooks/useComment'

export default function CommentFooter({
  id,
  commentThreadId,
  replyingTo, 
  currentContent,
  setCurrentContent,
  isCurrent,
  isEditing,
  setIsEditing,
  setIsReplying,
  setTextAreaFirstClick,
 }) {

  const { openModal } = useModal()
  const { changeComment, editReply } = useComment()

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
    if(replyingTo) {
      console.log('Replying Toooooo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      console.log('commentThreadId: ', commentThreadId)
      console.log('id: ', id)
      console.log('currentContent: ', currentContent)
      
      setCurrentContent(prevState => prevState.replace(`@${replyingTo} `, ''))
      editReply(commentThreadId, id, currentContent)
    }
    if(!replyingTo) {
      setCurrentContent(prevState => prevState.replace(`@${replyingTo} `, ''))
      changeComment(id, currentContent)
    }
    setIsEditing(false)
    setTextAreaFirstClick(true)
    
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
              className='comment__footer__btn-update grid-in-submitBtn self-center justify-self-end text-base font-medium uppercase text-neutral-white bg-primary-moderate-blue rounded-lg py-3 px-4 max-w-[107px] hover:opacity-40 md:px-5'
              onClick={handleUpdateClick}
            >
              Update
            </button>

          )
      }


      </div>
    </>
  )
}
