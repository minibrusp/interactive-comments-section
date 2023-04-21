/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'

// Components
import CommentForm from './CommentForm'
import useUserContext from '../hooks/useUserContext'

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



const avatars = new Map([
  ['amyrobson', avatarAmy],
  ['juliusomo', avatarJulius],
  ['maxblagun', avatarMax],
  ['ramsesmiron', avatarRam],
])

export default function Comment({id, content, createdAt, score, user, replies, replyingTo}) {
  const { currentUser } = useUserContext()
  const [isReplying, setIsReplying] = useState(false)
  const isCurrent = currentUser?.username === user?.username ? true : false

  const handleReplyClick = () => {
    setIsReplying(true)
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
          <p className='comment__content__text'>
            {content}
          </p>
        </div>
        <div className="comment__votes bg-neutral-very-light-gray inline-flex justify-start items-center rounded-lg grid-in-votes">
          <button className='comment__votes__upvote-btn block py-[15px] px-4'>
            <img src={plusIcon} alt='icon add' />
          </button>
          <div className="comment__votes__text">
            <p className='comment__votes__text__content text-primary-moderate-blue font-bold'>{score}</p>
          </div>
          <button className='comment__votes__downvote-btn block py-[15px] px-4'>
            <img src={minusIcon} alt='icon minus' />
          </button>
        </div>
        <div className="comment__footer grid-in-replybtn self-center flex flex-row gap-4 justify-self-end">

          {
            !isCurrent && (
              <button 
                className="comment__footer__btn flex justify-center items-center gap-2"
                onClick={handleReplyClick}
              >
                <img src={replyBtn} alt="reply button" />
                <span className='text-primary-moderate-blue font-medium'>Reply</span>
              </button>
            )
          }

          {
            isCurrent && (
              <>
                <button className="comment__footer__btn flex justify-center items-center gap-2">
                  <img src={deleteBtn} alt="delete button" />
                  <span className='text-primary-soft-red font-medium'>Delete</span>
                </button>
                <button className="comment__footer__btn flex justify-center items-center gap-2">
                  <img src={editBtn} alt="delete button" />
                  <span className='text-primary-moderate-blue font-medium'>Edit</span>
                </button>
              </>
            )
          }


          

        </div>
      </div>
      {
        isReplying && (
          <CommentForm btnText="reply" placeholder={`Replying to @${user?.username}...`} />
        )
      }
    </>
  )
}
