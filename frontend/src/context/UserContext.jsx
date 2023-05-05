/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

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
      avatar: avatarJulius,
      username: 'juliusomo',
    }
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user) {
      dispatch({ type: "USER_LOGIN", payload: user})
    }

  }, [])

  console.log('AuthContext state: ', state)

  return (
    <UserContext.Provider value={{...state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}