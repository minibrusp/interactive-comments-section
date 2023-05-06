import { Outlet } from "react-router-dom"
import Header from "../components/Header"

import useUserContext from "../hooks/useUserContext"
import Footer from "../components/Footer"


export default function Root() {
  const { currentUser, dispatch } = useUserContext()

  return (
    <>
      <Header currentUser={currentUser} dispatch={dispatch} />
      <Outlet />
      <Footer />
    </>
  ) 
}
