/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";

export const CommentContext = createContext()

export const commentsReducer = (state, action) => {
  switch(action.type) {
    case 'SET_COMMENTS':
      return {
        comments: action.payload
      }
    case 'CREATE_COMMENT':
      return {
        comments: [...state.comments, action.payload]
      }
    case 'EDIT_COMMENT':
      return {
        comments: [...state.comments.map(comment => {
          if(comment._id === action.payload.id) {
            return {
              ...comment,
              content: action.payload.content
            }
          } 
          return {...comment}
        })]
      }
    case 'DELETE_COMMENT':
      return {
        comments: [
          ...state.comments.filter(comment => {
            return comment._id !== action.payload.id
          })
        ]
      }
    case 'UPVOTE_COMMENT':
      return {
        comments: [...state.comments.map(comment => {
          if(comment._id === action.payload.id) {
            return {
              ...comment,
              score: comment.score + 1
            }
          }
          return {...comment} 
        })]
      }
    case 'DOWNVOTE_COMMENT':
      return {
        comments: [...state.comments.map(comment => {
          if(comment._id === action.payload.id) {
            return {
              ...comment,
              score: comment.score - 1
            }
          }
          return {...comment} 
        })]
      }
    case 'REPLY_COMMENT':
      return {
        comments: [...state.comments.map(comment => {
          if(comment._id === action.payload.id) {
            return {
              ...comment,
              replies: [ ...comment.replies, action.payload.reply ]
            }
          }
          return {...comment} 
        })]
      }
    case 'EDIT_REPLY':
      return {
        comments: [...state.comments.map(comment => {
          if(comment._id === action.payload.id) {
            return {
              ...comment,
              replies: [ ...comment.replies.map(reply => {
                if(reply._id === action.payload.replyId) {
                  return {
                    ...reply,
                    content: action.payload.content
                  }
                }
                return {...reply}
              }) ]
            }
          } 
          return {...comment}
        })]
      }
    case 'DELETE_REPLY':
      return {
        comments: [...state.comments.map(comment => {
          if(comment._id === action.payload.id) {
            return {
              ...comment,
              replies: [ ...comment.replies.filter(reply => {
                return reply._id !== action.payload.replyId

              }) ]
            }
          } 
          return {...comment}
        })]
      }
      case 'UPVOTE_REPLY':
        return {
          comments: [...state.comments.map(comment => {
            if(comment._id === action.payload.id) {
              return {
                ...comment,
                replies: [ ...comment.replies.map(reply => {
                  if(reply._id === action.payload.replyId) {
                    return {
                      ...reply,
                      score: reply.score + 1
                    }
                  }
                  return {...reply}
                }) ]
              }
            } 
            return {...comment}
          })]
        }
      case 'DOWNVOTE_REPLY':
        return {
          comments: [...state.comments.map(comment => {
            if(comment._id === action.payload.id) {
              return {
                ...comment,
                replies: [ ...comment.replies.map(reply => {
                  if(reply._id === action.payload.replyId) {
                    return {
                      ...reply,
                      score: reply.score - 1
                    }
                  }
                  return {...reply}
                }) ]
              }
            } 
            return {...comment}
          })]
        }
      case 'REPLY_REPLY':
        return {
          comments: [...state.comments.map(comment => {
            if(comment._id === action.payload.id) {
              return {
                ...comment,
                replies: [ ...comment.replies, action.payload.reply ]
              }
            }
            return {...comment} 
          })]
        }


    default:
      return state
  }
}

export function CommentContextProvider({ children }) {
  const [ state, dispatch ] = useReducer(commentsReducer, {
    comments: null
  })

  return (
    <CommentContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CommentContext.Provider>
  )
}