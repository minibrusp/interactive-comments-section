/* eslint-disable no-unused-vars */
import { FaUpload } from "react-icons/fa";
import { useState } from "react"

import { useNavigate } from "react-router-dom";

import useSignup from "../hooks/useSignup";

export default function SignupForm() {
  const { signup, error, isLoading, emptyFields } = useSignup()
  const [ filePreview, setFilePreview ] = useState(null)
  const [ currentFile, setCurrentFile ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate()

  const handleFileChange = (e) => {

    e.preventDefault()

    if(e.target.files.length === 0) return

    if((filePreview) && (e.target.files.length !== 0) ) {
      URL.revokeObjectURL(filePreview)
      setFilePreview(null)
      setCurrentFile(null)
    }
    setCurrentFile(e.target.files[0])
    setFilePreview(URL.createObjectURL(e.target.files[0]))

  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isSuccess = await signup(username, password, currentFile)

    if(isSuccess) {
      URL.revokeObjectURL(filePreview)
      setFilePreview(null)
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

        <label 
          htmlFor="avatar"
          className={`font-rubik text-neutral-white h-[100px] w-[100px] bg-primary-moderate-blue rounded-full cursor-pointer flex flex-row justify-center items-center shadow-md border ${ emptyFields?.includes('avatar') ? 'border-primary-soft-red' : '' }`} 
        >
          { !filePreview && <FaUpload className="text-2xl" /> }
          
          { filePreview && <img src={filePreview} className="h-[100px] w-[100px] rounded-full" alt="avatar" /> }

        </label>


        <input 
          type="file" 
          name="avatar" 
          id="avatar" 
          placeholder="avatar"
          className="hidden" 
          onChange={handleFileChange}
        />

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
          { !isLoading && <span>Signup</span> }
          { isLoading && <span>Loading....</span> }
        </button>

      </form>
  )
}
