import useUserContext from "./useUserContext"
import useCommentContext from "./useCommentContext"
import {v1 as uuidv1 } from 'uuid'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from "react"


export default function useComment() {

  const { currentUser } = useUserContext()
  const { dispatch } = useCommentContext()
  const [ isLoading, setIsLoading] = useState(false)
  const [ error, setError ] = useState(null)
  const [ emptyFields, setEmptyFields ] = useState([])

  const createComment = async (content) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const coms = {
      "content": content,
      "userId": currentUser.id
    }

    const response = await fetch('http://localhost:4001/api/comments/', {
      method: 'POST',
      body: JSON.stringify(coms),
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'CREATE_COMMENT', payload: json})
      setIsLoading(false)
    }
    

  }

  const changeComment = async (id, newContent) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`http://localhost:4001/api/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: newContent }),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'EDIT_COMMENT', payload: { id: json._id, content: json.content}})
      setIsLoading(false)
    }

  }

  const deleteComment = async (id) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`http://localhost:4001/api/comments/${id}`, {
      method: 'DELETE',
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'DELETE_COMMENT', payload: { id: json._id } })
      setIsLoading(false)
    }

  }

  const upvoteComment = async (id, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const newScore = score + 1

    const response = await fetch(`http://localhost:4001/api/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: newScore }),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'UPVOTE_COMMENT', payload: { id: json._id } })
      setIsLoading(false)
    }

  }


  const downvoteComment = async (id, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const newScore = score - 1

    const response = await fetch(`http://localhost:4001/api/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: newScore }),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'DOWNVOTE_COMMENT', payload: { id: json._id } })
      setIsLoading(false)
    }

  }

  // REPLIES 

  const replyToComment = async (id, content, commentThreadUserId) => {


    // console.log('REPLY TO COMMENT ~~~~~~~~~~~~~~~~')

    // id is comment thread ID
    // console.log('Comment ID: ', id)
    // console.log('Content: ', content)
    // console.log('commentThreadUserId: ', commentThreadUserId)
    // console.log('Current User ID: ', currentUser.id)

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

 
    const newReply = {
      content: content,
      replyingTo: commentThreadUserId,
      user: currentUser.id
    }

    const response = await fetch(`http://localhost:4001/api/replies/${id}`, {
      method: 'POST',
      body: JSON.stringify(newReply),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'REPLY_COMMENT', payload: { id: id, reply: json} })
      setIsLoading(false)
    }


  }
  
  const editReply = async (id, replyId, content) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`http://localhost:4001/api/replies/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: content }),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'EDIT_REPLY', payload: { id: id, content: json.content, replyId: json._id } })
      setIsLoading(false)
    }

  }

  const deleteReply = async (id, replyId) => {

    console.log('ID: ', id)
    console.log('replyId: ', replyId)


    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`http://localhost:4001/api/replies/${id}/${replyId}`, {
      method: 'DELETE',
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'DELETE_REPLY', payload: { id: id, replyId: json._id } })
      setIsLoading(false)
    }

  }

  const upvoteReply = async (id, replyId, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`http://localhost:4001/api/replies/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: score + 1 }),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'UPVOTE_REPLY', payload: { id: id, replyId: json._id } })
      setIsLoading(false)
    }

  }

  const downvoteReply = async (id, replyId, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`http://localhost:4001/api/replies/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: score - 1 }),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'DOWNVOTE_REPLY', payload: { id: id, replyId: json._id } })
      setIsLoading(false)
    }

  }

  const replyToReply = async (id, content, replyingToID) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    // console.log('replyToReply')
    
    // console.log('REPLY TO REPLY ~~~~~~~~~~~~~~~~')

    // id is comment thread ID
    // console.log('Comment ID: ', id)
    // console.log('Content: ', content)
    // console.log('REPLYING TO: ', replyingToID)
    // console.log('Current User ID: ', currentUser.id)

    const newReply = {
      content: content,
      replyingTo: replyingToID,
      user: currentUser.id
    }

    const response = await fetch(`http://localhost:4001/api/replies/${id}`, {
      method: 'POST',
      body: JSON.stringify(newReply),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      console.log(json.error.message)
    }

    if(response.ok) {
      console.log(json)
      dispatch({ type: 'REPLY_REPLY', payload: { id: id, reply: json} })
      setIsLoading(false)
    }

  }


  
  return { 
    createComment, 
    changeComment, 
    deleteComment, 
    upvoteComment, 
    downvoteComment, 
    replyToComment, 
    editReply,
    deleteReply,
    upvoteReply,
    downvoteReply,
    replyToReply,
    isLoading,
    error,
    emptyFields 
  }
}
