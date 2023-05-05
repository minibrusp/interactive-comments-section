/* eslint-disable no-unused-vars */
import { useState } from "react"

import { useNavigate } from "react-router-dom";

import useLogin from "../hooks/useLogin";

export default function SignupForm() {
  const { login, error, isLoading, emptyFields } = useLogin()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate()

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    
    const isSuccess = await login(username, password)

    if(isSuccess) {

      setUsername('')
      setPassword('')

      navigate('/')
    }


    
  }

  return (
    <form 
      className="mx-auto flex flex-col items-center gap-y-4 px-4 max-w-[375px]"
      onSubmit={handleSubmit}
    >

      {error && <span className="text-sm text-primary-soft-red font-bold">{error}</span>}
      
      <input 
        className={`font-rubik px-4 py-2 border border-primary-light-grayish-blue rounded-md shadow-md w-full text-center ${ emptyFields?.includes('username') ? 'border-primary-soft-red' : '' } `} 
        type="text" 
        name="username" 
        id="username" 
        placeholder="Username"
        onChange={handleUsernameChange}
        value={username} 
      />

      <input 
        className={`font-rubik px-4 py-2 border border-primary-light-grayish-blue rounded-md shadow-md w-full text-center ${ emptyFields?.includes('password') ? 'border-primary-soft-red' : '' } `}  
        type="password" 
        name="password" 
        id="password" 
        placeholder="password"
        onChange={handlePasswordChange}
        value={password} 
      />

      <button 
        disabled={isLoading}
        className="font-rubik bg-primary-moderate-blue text-neutral-white px-4 py-2 rounded-md shadow-md w-full" 
        type="submit"
      >
        { !isLoading && <span>Login</span> }
        { isLoading && <span>Loading....</span> }
      </button>

    </form>
  )
}
