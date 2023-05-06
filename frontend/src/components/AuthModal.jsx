/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import useAuthModal from '../hooks/useAuthModal'

export default function AuthModal() {

  const { authError, closeAuthModal } = useAuthModal()
  const navigate = useNavigate()

  const handleLoginBtnClick = () => {
    console.log('Login')
    closeAuthModal()
    navigate('/login')
  }
  const handleRegisterBtnClick = () => {
    console.log('Register')
    closeAuthModal()
    navigate('/signup')
  }

  const handleContainerClick = () => {
    closeAuthModal()
  }

  const handleContentClick = event => {
    event.stopPropagation()
  }

  return (
    <div 
      className='auth-modal__container bg-neutral-dark-blue/40 min-h-screen w-full flex items-center justify-center fixed z-10 top-0 left-0'
      onClick={handleContainerClick}
    >
      <div 
        className="auth-modal__content bg-neutral-white mx-4 py-6 px-[26px] rounded-lg max-w-[400px] md:px-8"
        onClick={e => handleContentClick(e)}
      >
        <h2 className="auth-modal__title text-neutral-dark-blue font-medium text-xl mb-4 md:text-2xl">{authError}</h2>
        <p className="auth-modal__text mb-4 ">Please login or register an account</p>
        <div className="auth-modal__cta flex flex-row justify-start items-center gap-4 w-full md:justify-between md:gap-3">
          <button 
            className='auth-modal__cta__login text-base font-medium uppercase text-neutral-white bg-neutral-grayish-blue rounded-lg py-3 px-4 md:px-8'
            onClick={handleLoginBtnClick}
          >
            login
          </button>
          <button 
            className='auth-modal__cta__register text-base font-medium uppercase text-neutral-white bg-primary-soft-red rounded-lg py-3 px-4 md:px-8'
            onClick={handleRegisterBtnClick}
          >
            register
          </button>
        </div>
      </div>
    </div>
  )
}
