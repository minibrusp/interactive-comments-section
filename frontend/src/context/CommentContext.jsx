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
          if(comment.id === action.payload.id) {
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
            return comment.id !== action.payload.id
          })
        ]
      }
    case 'UPVOTE_COMMENT':
      return {
        comments: [...state.comments.map(comment => {
          if(comment.id === action.payload.id) {
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
          if(comment.id === action.payload.id) {
            return {
              ...comment,
              score: comment.score - 1
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