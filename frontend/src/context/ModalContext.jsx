/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const ModalContext = createContext()


export const ModalContextProvider = ({ children }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [targetComment, setTargetComment] = useState(null)
  const [targetReply, setTargetReply] = useState(null)


  return (
    <ModalContext.Provider 
      value={{ 
        isModalOpen, 
        setIsModalOpen, 
        targetComment, 
        setTargetComment,
        targetReply,
        setTargetReply 
    }}>
      {children}
    </ModalContext.Provider>
  )
}