/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const AuthModalContext = createContext()


export const AuthModalContextProvider = ({ children }) => {
  const [ isAuthModalOpen, setIsAuthModalOpen ] = useState(false)
  const [ authError, setAuthError ] = useState(null)


  return (
    <AuthModalContext.Provider 
      value={{ 
        isAuthModalOpen, 
        setIsAuthModalOpen,
        authError, 
        setAuthError
    }}>
      {children}
    </AuthModalContext.Provider>
  )
}