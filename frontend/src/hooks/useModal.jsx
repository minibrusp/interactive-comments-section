import useComment from './useComment'
import useModalContext from './useModalContext'

export default function useModal() {
  const { setIsModalOpen, setTargetComment, setTargetReply, targetReply } = useModalContext()
  const { deleteComment, deleteReply } = useComment()

  const openModal = (id, replyId = null) => {
    setIsModalOpen(true)
    setTargetComment(id)
    if(replyId) {
      setTargetReply(replyId)
    }
  }

  const closeModal = (replyId = null) => {
    setIsModalOpen(false)
    setTargetComment(null)
    if(replyId) {
      setTargetReply(null)
    }
  }
  
  const modalDeleteConfirm = (id) => {
    setIsModalOpen(false)
    if(!targetReply) {
      deleteComment(id)
    } else {
      deleteReply(id, targetReply)
      setTargetReply(null)
    }
    setTargetComment(null)
  }

  return { openModal, closeModal, modalDeleteConfirm }
}
