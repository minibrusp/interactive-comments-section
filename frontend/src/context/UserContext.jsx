/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

import avatarJulius from '../assets/images/avatars/image-juliusomo.webp'


export const UserContext = createContext()

export const userReducer = (state, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return { currentUser: action.payload }
    case 'USER_LOGOUT':
      return { currentUser: null }
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(userReducer, {
    currentUser: {
      image: avatarJulius,
      username: 'juliusomo',
    }
  })

  return (
    <UserContext.Provider value={{...state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}