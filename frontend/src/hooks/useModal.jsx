import useComment from './useComment'
import useModalContext from './useModalContext'

export default function useModal() {
  const { setIsModalOpen, setTargetComment } = useModalContext()
  const { deleteComment } = useComment()

  const openModal = (id) => {
    setIsModalOpen(true)
    setTargetComment(id)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTargetComment(null)
  }
  
  const modalDeleteConfirm = (id) => {
    setIsModalOpen(false)
    deleteComment(id)
  }

  return { openModal, closeModal, modalDeleteConfirm }
}
