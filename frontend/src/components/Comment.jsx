/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'

// Components
import CommentForm from './CommentForm'

// hooks
import useUserContext from '../hooks/useUserContext'
import useComment from '../hooks/useComment'

// asssets
// avatars
import avatarAmy from '../assets/images/avatars/image-amyrobson.webp'
import avatarJulius from '../assets/images/avatars/image-juliusomo.webp'
import avatarMax from '../assets/images/avatars/image-maxblagun.webp'
import avatarRam from '../assets/images/avatars/image-ramsesmiron.webp'

// icons
import replyBtn from '../assets/images/icon-reply.svg'
import deleteBtn from '../assets/images/icon-delete.svg'
import editBtn from '../assets/images/icon-edit.svg'
import plusIcon from '../assets/images/icon-plus.svg'
import minusIcon from '../assets/images/icon-minus.svg'
import useModal from '../hooks/useModal'



const avatars = new Map([
  ['amyrobson', avatarAmy],
  ['juliusomo', avatarJulius],
  ['maxblagun', avatarMax],
  ['ramsesmiron', avatarRam],
])

export default function Comment({id, commentThreadId, content, createdAt, score, user, replies, replyingTo}) {
  const { currentUser } = useUserContext()
  const { changeComment, upvoteComment, downvoteComment, editReply, upvoteReply, downvoteReply } = useComment()
  const { openModal } = useModal()

  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState(content)
  const isCurrent = currentUser?.username === user?.username ? true : false
  const [textAreaFirstClick, setTextAreaFirstClick] = useState(true)

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

  const handleUpvoteClick = () => {
    if(!replyingTo) {
      upvoteComment(id)
    }
    if(replyingTo) {
      upvoteReply(commentThreadId, id)
    }
  }

  const handleDownvoteClick = () => {
    
    if(!replyingTo) {
      downvoteComment(id)
    }

    if(replyingTo) {
      downvoteReply(commentThreadId, id)
    }
  }

  const handleTextAreaFirstClick = (e) => {
    if(textAreaFirstClick) {
      e.target.scrollTop = e.target.scrollHeight
      setTextAreaFirstClick(false)
    }
  }



  return (
    <>
      <div className="comment bg-neutral-white p-4 my-4 rounded-lg grid grid-areas-comment-slim last-of-type:mb-0">
        <div className="comment__heading flex justify-start items-center gap-3 mb-4 grid-in-header">
          <img className='comment__avatar h-8 w-8' src={avatars.get(`${user?.username}`)} alt="user image avatar" />
          <p className='comment__username text-neutral-dark-blue'><strong>{user?.username}</strong></p>
          { 
            isCurrent && (
              <p className='comment__current-user text-neutral-white bg-primary-moderate-blue px-1.5 py-px tracking-wide rounded-sm text-xs font-medium'>you</p>
            ) 
          }
          <p className='comment__date text-neutral-grayish-blue'>{createdAt}</p>
        </div>
        <div className="comment__content mb-4 grid-in-content">
          {
            !isEditing && (
              <p className='comment__content__text'>
                {
                  replyingTo && (
                    <span className=' text-primary-moderate-blue font-medium'>{`@${replyingTo} `}</span>
                  )
                }
                {currentContent}
              </p>
            )
          }

          {
            isEditing && (
              <textarea 
                className="commentform__form__content resize-none text-neutral-dark-blue w-full min-h-[7rem] p-3 mb-4 border border-neutral-light-gray rounded-lg placeholder:text-neutral-grayish-blue focus-visible:outline-none focus-visible:border-neutral-grayish-blue grid-in-text"
                placeholder=''
                onChange={(e) => {setCurrentContent(e.target.value)}}
                value={currentContent}
                onClick={(e) => handleTextAreaFirstClick(e)}
              />
            )
          }

        </div>
        <div className="comment__votes bg-neutral-very-light-gray inline-flex justify-start items-center rounded-lg grid-in-votes">
          <button 
            className='comment__votes__upvote-btn block py-[15px] px-4'
            onClick={handleUpvoteClick}
          >
            <img src={plusIcon} alt='icon add' />
          </button>
          <div className="comment__votes__text">
            <p className={`comment__votes__text__content font-bold ${Number(score) >= 0 ? 'text-primary-moderate-blue' : 'text-primary-soft-red'} `}>{Number(score)}</p>
          </div>
          <button 
            className='comment__votes__downvote-btn block py-[15px] px-4'
            onClick={handleDownvoteClick}
          >
            <img src={minusIcon} alt='icon minus' />
          </button>
        </div>
        <div className="comment__footer grid-in-replybtn self-center flex flex-row gap-4 justify-self-end">

          {
            !isCurrent && (
              <button 
                className="comment__footer__btn-reply flex justify-center items-center gap-2"
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
                      className="comment__footer__btn-delete flex justify-center items-center gap-2"
                      onClick={handleDeleteComment}
                    >
                      <img src={deleteBtn} alt="delete button" />
                      <span className='text-primary-soft-red font-medium'>Delete</span>
                    </button>
                    <button 
                      className="comment__footer__btn-edit flex justify-center items-center gap-2"
                      onClick={handleEditClick}
                    >
                      <img src={editBtn} alt="delete button" />
                      <span className='text-primary-moderate-blue font-medium'>Edit</span>
                    </button>
                  </>
                ) 
              : null
          }

          {
            (isCurrent) && (isEditing)
            && (
                <button 
                  className='comment__footer__btn-update grid-in-submitBtn self-center justify-self-end text-base font-medium uppercase text-neutral-white bg-primary-moderate-blue rounded-lg py-3 px-4 max-w-[107px]'
                  onClick={handleUpdateClick}
                >
                  Update
                </button>

              )
          }
          

        </div>
      </div>

      {
        isReplying && (
          <CommentForm commentThreadId={commentThreadId} recipientId={id} btnText="reply" replyingTo={user?.username} setIsReplying={setIsReplying} />
        )
      }

    </>
  )
}
