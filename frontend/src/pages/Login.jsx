import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import FormHeading from "../components/FormHeading"
import LoginForm from "../components/LoginForm"

import useAuthModal from '../hooks/useAuthModal'

export default function Login() {

  const { isAuthenticated } = useAuthModal()
  const navigate = useNavigate()

  useEffect(() => {
    isAuthenticated() 
      ? navigate('/')
      : null
  }, [ isAuthenticated, navigate ])

  return (
    <section className="mx-4">
      <div className="bg-neutral-white px-4 py-8 max-w-[733px] mx-auto shadow-md rounded-md">
        <FormHeading 
          heading="Login to your account"
          caption="Don't have an account yet? "
          linkDirection="/signup"
          linkText="Signup"
        />

        <LoginForm />
      </div>
    </section>
  )
}
