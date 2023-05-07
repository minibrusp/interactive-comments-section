/* eslint-disable react/prop-types */

export default function CommentContent({isLoading, isEditing, content, currentContent, setCurrentContent, replyingTo, textAreaFirstClick, setTextAreaFirstClick}) {

  const handleTextAreaFirstClick = (e) => {
    if(textAreaFirstClick) {
      e.target.scrollTop = e.target.scrollHeight
      setTextAreaFirstClick(false)
    }
  }

  return (
    <div className="comment__content mb-4 grid-in-content md:m-0">
          {
            !isEditing && (
              <p className='comment__content__text'>
                {
                  replyingTo && (
                    <span className=' text-primary-moderate-blue font-medium'>{`@${replyingTo} `}</span>
                  )
                }
                {content}
              </p>
            )
          }

          {
            isEditing && (
              <textarea
                disabled={isLoading} 
                className="commentform__form__content resize-none text-neutral-dark-blue w-full min-h-[7rem] p-3 mb-4 border border-neutral-light-gray rounded-lg placeholder:text-neutral-grayish-blue focus-visible:outline-none focus-visible:border-neutral-grayish-blue grid-in-text disabled:bg-neutral-light-gray disabled:text-neutral-grayish-blue disabled:cursor-wait hover:cursor-pointer hover:border-neutral-grayish-blue md:m-0 md:min-h-[7.8rem]"
                placeholder=''
                onChange={(e) => {setCurrentContent(e.target.value)}}
                value={currentContent}
                onClick={(e) => handleTextAreaFirstClick(e)}
              />
            )
          }

        </div>
  )
}
