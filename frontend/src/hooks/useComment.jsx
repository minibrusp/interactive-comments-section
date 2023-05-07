import { useState } from "react"
import { toast } from 'react-toastify';

import useUserContext from "./useUserContext"
import useCommentContext from "./useCommentContext"
import useAuthModal from "./useAuthModal"
import useModalContext from "./useModalContext";


import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa"
import { BiDownvote, BiUpvote } from "react-icons/bi"



export default function useComment() {

  const { currentUser } = useUserContext()
  const { isAuthenticated, openAuthModal } = useAuthModal()
  const { dispatch } = useCommentContext()
  const [ isLoading, setIsLoading] = useState(false)
  const [ error, setError ] = useState(null)
  const [ emptyFields, setEmptyFields ] = useState([])
  const { setIsModalOpen } = useModalContext()

  const url = import.meta.env.VITE_APP_API_ENDPOINT

  const createComment = async (content, setComment) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])


    const coms = {
      "content": content,
      "userId": currentUser.id
    }

    const response = await fetch(`${url}comments/`, {
      method: 'POST',
      body: JSON.stringify(coms),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)


      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }
    }

    if(response.ok) {
      dispatch({ type: 'CREATE_COMMENT', payload: json})
      setIsLoading(false)
      setComment('')
      toast.success('comment successfully created', {
        icon: <FaSave />,
        autoClose: 3000
      });
    }
    

  }

  const changeComment = async (id, newContent, setIsEditing, setTextAreaLoader) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    if(newContent === '') {
      setIsLoading(false)
      setTextAreaLoader(false)
      setError('Please fill in your comment')
      return
    }

    const response = await fetch(`${url}comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: newContent }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      setTextAreaLoader(false)

      if(!isAuthenticated()) {
        setIsEditing(false)
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'EDIT_COMMENT', payload: { id: json._id, content: json.content}})
      setIsLoading(false)
      setTextAreaLoader(false)
      toast.success('comment successfully updated', {
        icon: <FaEdit />,
        autoClose: 3000
      });
    }

  }

  const deleteComment = async (id) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`${url}comments/${id}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      
      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'DELETE_COMMENT', payload: { id: json._id } })
      setIsLoading(false)
      setIsModalOpen(false)
      toast.success('comment successfully deleted', {
        icon: <FaTrashAlt />,
        autoClose: 3000
      });
      
    }

  }

  const upvoteComment = async (id, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const newScore = score + 1

    const response = await fetch(`${url}comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: newScore }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)

      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'UPVOTE_COMMENT', payload: { id: json._id } })
      setIsLoading(false)
      toast.success('comment successfully upvoted !!!', {
        icon: <BiUpvote />,
        autoClose: 3000
      });
    }

  }


  const downvoteComment = async (id, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const newScore = score - 1

    const response = await fetch(`${url}comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: newScore }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)

      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'DOWNVOTE_COMMENT', payload: { id: json._id } })
      setIsLoading(false)
      toast.success('comment successfully downvoted', {
        icon: <BiDownvote />,
        autoClose: 3000
      });
    }

  }

  // REPLIES 

  const replyToComment = async (id, content, commentThreadUserId, setIsReplying, setComment) => {


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

    const response = await fetch(`${url}replies/${id}`, {
      method: 'POST',
      body: JSON.stringify(newReply),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)

      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'REPLY_COMMENT', payload: { id: id, reply: json} })
      setIsLoading(false)
      setIsReplying(false)
      setComment('')
      toast.success('reply successfully created', {
        icon: <FaSave />,
        autoClose: 3000
      });
    }


  }
  
  const editReply = async (id, replyId, content, setIsEditing, setTextAreaLoader) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    if(content === '') {
      setIsLoading(false)
      setTextAreaLoader(false)
      setEmptyFields(['content'])
      setError('Please fill in your comment')
      return
    }



    const response = await fetch(`${url}replies/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: content }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)
      setTextAreaLoader(false)

      if(!isAuthenticated()) {
        setIsEditing(false)
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'EDIT_REPLY', payload: { id: id, content: json.content, replyId: json._id } })
      setIsLoading(false)
      setTextAreaLoader(false)
      toast.success('reply successfully updated', {
        icon: <FaEdit />,
        autoClose: 3000
      });
    }

  }

  const deleteReply = async (id, replyId) => {

    // console.log('ID: ', id)
    // console.log('replyId: ', replyId)


    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`${url}replies/${id}/${replyId}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)

      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }
    }

    if(response.ok) {
      dispatch({ type: 'DELETE_REPLY', payload: { id: id, replyId: json._id } })
      setIsLoading(false)
      setIsModalOpen(false)
      toast.success('reply successfully deleted', {
        icon: <FaTrashAlt />,
        autoClose: 3000
      });
    }

  }

  const upvoteReply = async (id, replyId, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`${url}replies/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: score + 1 }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)

      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'UPVOTE_REPLY', payload: { id: id, replyId: json._id } })
      setIsLoading(false)
      toast.success('reply successfully upvoted !!!', {
        icon: <BiUpvote />,
        autoClose: 3000
      });
    }

  }

  const downvoteReply = async (id, replyId, score) => {

    setIsLoading(true)
    setError(null)
    setEmptyFields([])

    const response = await fetch(`${url}replies/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ score: score - 1 }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)

      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'DOWNVOTE_REPLY', payload: { id: id, replyId: json._id } })
      setIsLoading(false)
      toast.success('reply successfully downvoted', {
        icon: <BiDownvote />,
        autoClose: 3000
      });
    }

  }

  const replyToReply = async (id, content, replyingToID, setIsReplying, setComment) => {

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

    const response = await fetch(`${url}replies/${id}`, {
      method: 'POST',
      body: JSON.stringify(newReply),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}` 
      },
    })

    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(json.error.message)

      if(!isAuthenticated()) {
        openAuthModal(json.error.message)
      }

    }

    if(response.ok) {
      dispatch({ type: 'REPLY_REPLY', payload: { id: id, reply: json} })
      setIsLoading(false)
      setIsReplying(false) 
      setComment('')
      toast.success('reply successfully created', {
        icon: <FaSave />,
        autoClose: 3000
      });
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
    setError,
    emptyFields 
  }
}
