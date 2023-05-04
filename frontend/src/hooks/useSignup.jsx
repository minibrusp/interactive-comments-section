import { useState } from "react"
import useUserContext from "./useUserContext"

export default function useSignup() {
  const { dispatch } = useUserContext()
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const [ emptyFields, setEmptyFields ] = useState([])

  const signup = async (username, password, currentFile) => {
    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    data.append('avatar', currentFile)

    const response = await fetch('http://localhost:4001/api/users/register', {
      method: 'POST',
      body: data,
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      setEmptyFields(json.error.emptyFields)

      return false
    }

    if (response.ok) {
      // save the user to local storage 
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'USER_LOGIN', payload: json})

      setIsLoading(false)

      return true
    }


  }

  return { signup, error, isLoading, emptyFields }

}
