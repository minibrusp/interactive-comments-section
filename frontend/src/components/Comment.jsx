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
      <div className="comment bg-neutral-white p-4 my-4 rounded-lg grid grid-areas-comment-slim shadow-sm last-of-type:mb-0 md:grid-areas-comment-large md:gap-x-6 md:px-7 md:py-6 md:grid-cols-[39px_1fr_auto]">
        <div className="comment__heading flex justify-start items-center gap-3 mb-4 grid-in-header">
          <img className='comment__avatar h-8 w-8 font-medium' src={avatars.get(`${user?.username}`)} alt="user image avatar" />
          <p className='comment__username text-neutral-dark-blue'><strong className="font-medium text-[1.0125rem]">{user?.username}</strong></p>
          { 
            isCurrent && (
              <p className='comment__current-user text-neutral-white bg-primary-moderate-blue px-1.5 py-px tracking-wide rounded-sm text-xs font-medium'>you</p>
            ) 
          }
          <p className='comment__date text-neutral-grayish-blue'>{createdAt}</p>
        </div>
        <div className="comment__content mb-4 grid-in-content md:m-0">
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
                className="commentform__form__content resize-none text-neutral-dark-blue w-full min-h-[7rem] p-3 mb-4 border border-neutral-light-gray rounded-lg placeholder:text-neutral-grayish-blue focus-visible:outline-none focus-visible:border-neutral-grayish-blue grid-in-text hover:cursor-pointer hover:border-neutral-grayish-blue md:m-0 md:min-h-[7.8rem]"
                placeholder=''
                onChange={(e) => {setCurrentContent(e.target.value)}}
                value={currentContent}
                onClick={(e) => handleTextAreaFirstClick(e)}
              />
            )
          }

        </div>
        <div className="comment__votes bg-neutral-very-light-gray inline-flex justify-start items-center rounded-lg grid-in-votes md:flex-col md:self-start md:rounded-xl max-w-[39px]">
          <button 
            className='comment__votes__upvote-btn group block py-[15px] px-4 md:px-3.5'
            onClick={handleUpvoteClick}
          >
            <svg className="fill-[#C5C6EF] group-hover:fill-primary-moderate-blue" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" /></svg>
            {/* <img src={plusIcon} alt='icon add' /> */}
          </button>
          <div className="comment__votes__text md:px-3.5">
            <p className={`comment__votes__text__content font-bold ${Number(score) >= 0 ? 'text-primary-moderate-blue' : 'text-primary-soft-red'} md:font-medium text-[1.1rem]`}>{Number(score)}</p>
          </div>
          <button 
            className='comment__votes__downvote-btn group block py-[15px] px-4 md:px-3.5'
            onClick={handleDownvoteClick}
          >
            <svg className="fill-[#C5C6EF] group-hover:fill-primary-moderate-blue" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>
            {/* <img src={minusIcon} alt='icon minus' /> */}
          </button>
        </div>
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
      </div>

      {
        isReplying && (
          <CommentForm commentThreadId={commentThreadId} recipientId={id} btnText="reply" replyingTo={user?.username} setIsReplying={setIsReplying} />
        )
      }

    </>
  )
}
