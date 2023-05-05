/* eslint-disable react/prop-types */

// avatars
import avatarAmy from '../assets/images/avatars/image-amyrobson.webp'
import avatarJulius from '../assets/images/avatars/image-juliusomo.webp'
import avatarMax from '../assets/images/avatars/image-maxblagun.webp'
import avatarRam from '../assets/images/avatars/image-ramsesmiron.webp'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const avatars = new Map([
  ['amyrobson', avatarAmy],
  ['juliusomo', avatarJulius],
  ['maxblagun', avatarMax],
  ['ramsesmiron', avatarRam],
])

export default function CommentHeading({ user, isCurrent, createdAt}) {
  return (
    <div className="comment__heading flex justify-start items-center gap-3 mb-4 grid-in-header">
      <img className='comment__avatar h-8 w-8 font-medium' src={avatars.get(`${user?.username}`)} alt="user image avatar" />
      <p className='comment__username text-neutral-dark-blue'><strong className="font-medium text-[1.0125rem]">{user?.username}</strong></p>
      { 
        isCurrent && (
          <p className='comment__current-user text-neutral-white bg-primary-moderate-blue px-1.5 py-px tracking-wide rounded-sm text-xs font-medium'>you</p>
        ) 
      }

      <p className='comment__date text-neutral-grayish-blue'>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p> 
    
    </div>
  )
}
