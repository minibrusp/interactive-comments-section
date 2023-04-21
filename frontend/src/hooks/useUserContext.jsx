import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function useUserContext() {
  const context = useContext(UserContext)

  if(!context) {
    throw Error("useUserContext must be used inside an UserContextProvider")
  }

  return context
}