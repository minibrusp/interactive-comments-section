import { CommentContext } from "../context/commentContext"
import { useContext } from "react"

export default function useCommentContext() {
  const context = useContext(CommentContext)

  if(!context) {
    throw Error("useCommentContext must be used inside an CommentContextProvider")
  }

  return context
}
