/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [ error, setError ] = useState(null)
  const [ errorElement, setErrorElement ] = useState([])
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

    
    if(!username) {
      setErrorElement(prevValue => [...prevValue, 'username'])
    } else {
      setErrorElement(prevValue => {
        return [
          ...prevValue.filter(error => error !== 'username')
        ]
      })
    }

    if(!password) {
      setErrorElement(prevValue => [...prevValue, 'password'])
    } else {
      setErrorElement(prevValue => {
        return [
          ...prevValue.filter(error => error !== 'password')
        ]
      })
    }
    
    if(!username || !password) {
      setError('All fields must be filled')
      return
    }

    const data = new FormData()
    data.append('username', username)
    data.append('password', password)

    const response = await fetch('http://localhost:4001/api/users/login', {
      method: 'POST',
      body: data,
    })

    

    const json = await response.json()

    if(!response.ok) {
      setError(json.error.message)
    }

    if(response.ok) {
      console.log(json)

      // setUsername('')
      // setPassword('')
      // setError(null)

      // navigate('/')
    }


    
  }

  return (
    <form 
      className="mx-auto flex flex-col items-center gap-y-4 px-4 max-w-[375px]"
      onSubmit={handleSubmit}
    >

      {error && <span className="text-sm text-primary-soft-red font-bold">{error}</span>}
      
      <input 
        className={`font-rubik px-4 py-2 border border-primary-light-grayish-blue rounded-md shadow-md w-full text-center ${ errorElement.includes('username') ? 'border-primary-soft-red' : '' } `} 
        type="text" 
        name="username" 
        id="username" 
        placeholder="Username"
        onChange={handleUsernameChange}
        value={username} 
      />

      <input 
        className={`font-rubik px-4 py-2 border border-primary-light-grayish-blue rounded-md shadow-md w-full text-center ${ errorElement.includes('password') ? 'border-primary-soft-red' : '' } `}  
        type="password" 
        name="password" 
        id="password" 
        placeholder="password"
        onChange={handlePasswordChange}
        value={password} 
      />

      <button 
        className="font-rubik bg-primary-moderate-blue text-neutral-white px-4 py-2 rounded-md shadow-md w-full" 
        type="submit"
      >
        Signup
      </button>

    </form>
  )
}
