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