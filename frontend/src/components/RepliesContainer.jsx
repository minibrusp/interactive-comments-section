/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Comment from "./Comment";

export default function RepliesContainer({ replies, commentThreadId }) {
  return (
    <>
      {replies.length !== 0 && (
        <div className="comment__reply ml-[1rem] relative shadow-sm before:absolute before:min-h-full before:w-[2px] before:left-[calc(-2rem/2)] before:bg-neutral-light-gray before:-z-10 md:ml-[5.7rem] md:before:left-[calc(-5.7rem/2)]">
          {
            replies.map(reply => (
              <Comment 
                key={reply.id}
                id={reply.id}
                content={reply.content}
                createdAt={reply.createdAt}
                score={reply.score}
                user={reply.user}
                replyingTo={reply.replyingTo}
                commentThreadId={commentThreadId}
              />
            ))
          }
        </div>
      )}
    </>
  )
}
