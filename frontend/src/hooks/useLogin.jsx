import { useState } from "react"
import useUserContext from "./useUserContext"

export default function useLogin() {
  const { dispatch } = useUserContext()
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const [ emptyFields, setEmptyFields ] = useState([])

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const data = new FormData()
    data.append('username', username)
    data.append('password', password)

    const response = await fetch('http://localhost:4001/api/users/login', {
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

  return { login, error, isLoading, emptyFields }

}
