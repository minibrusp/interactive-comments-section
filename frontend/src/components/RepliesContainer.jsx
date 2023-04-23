/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Comment from "./Comment";

export default function RepliesContainer({ replies, commentThreadId }) {

  return (
    <div className="comment__reply ml-[1rem] before:absolute before:min-h-full before:w-[2px] before:left-[calc(0rem/2)] before:bg-neutral-light-gray">
      {replies && 
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
  )
}
