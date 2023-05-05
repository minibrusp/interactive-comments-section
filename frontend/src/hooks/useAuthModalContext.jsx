import { AuthModalContext } from "../context/AuthModalContext";
import { useContext } from "react";

export default function useAuthModalContext() {
  const context = useContext(AuthModalContext)

  if(!context) {
    throw Error("useAuthModalContext must be used inside an AuthModalContext")
  }

  return context
}