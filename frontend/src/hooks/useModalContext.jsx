import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";

export default function useModalContext() {
  const context = useContext(ModalContext)

  if(!context) {
    throw Error("useModalContextContext must be used inside an ModalContextProvider")
  }

  return context
}