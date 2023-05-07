/* eslint-disable react/prop-types */

// hooks 
import useComment from "../hooks/useComment"

export default function CommentVotes({ id, commentThreadId, score, replyingTo }) {

  const { upvoteComment, upvoteReply, downvoteComment, downvoteReply, isLoading } = useComment()

  const handleUpvoteClick = () => {
    if(isLoading) return

    if(!replyingTo) {
      upvoteComment(id, score)
    }
    if(replyingTo) {
      upvoteReply(commentThreadId, id, score)
    }
  }

  const handleDownvoteClick = () => {
    if(isLoading) return
    
    if(!replyingTo) {
      downvoteComment(id, score)
    }

    if(replyingTo) {
      downvoteReply(commentThreadId, id, score)
    }
  }

  return (
    <div className="comment__votes bg-neutral-very-light-gray inline-flex justify-start items-center rounded-lg grid-in-votes md:flex-col md:self-start md:rounded-xl max-w-[97px]">
          <button 
            disabled={isLoading}
            className='comment__votes__upvote-btn group block py-[15px] px-4 md:px-3.5'
            onClick={handleUpvoteClick}
          >
            {
              !isLoading && (
                <svg className="fill-[#C5C6EF] group-hover:fill-primary-moderate-blue" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" /></svg>
              )
            }

            { isLoading && (
              <div className="commentform__form__btn__loader block text-center mx-auto max-h-[11px]">
                <div className="block h-[11px] w-[11px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-light-grayish-blue motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>

              </div>
            ) }
            
          </button>
          <div className="comment__votes__text md:px-3.5">
            <p className={`comment__votes__text__content font-bold ${Number(score) >= 0 ? 'text-primary-moderate-blue' : 'text-primary-soft-red'} md:font-medium text-[1.1rem]`}>{Number(score)}</p>
          </div>

          <button
            disabled={isLoading} 
            className='comment__votes__downvote-btn group block py-[15px] px-4 md:px-3.5'
            onClick={handleDownvoteClick}
          >
            {
              !isLoading && (
                <svg className="fill-[#C5C6EF] group-hover:fill-primary-moderate-blue" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>
              )
            }

            { isLoading && (
              <div className="commentform__form__btn__loader block text-center mx-auto max-h-[11px]">
                <div className="block h-[11px] w-[11px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-light-grayish-blue motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>

              </div>
            ) }

          </button>
        </div>
  )
}
