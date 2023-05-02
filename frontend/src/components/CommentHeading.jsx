/* eslint-disable react/prop-types */
export default function CommentHeading({ avatars, user, isCurrent, createdAt}) {
  return (
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
  )
}
