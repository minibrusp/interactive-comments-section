import useModalContext from './useModalContext'

export default function useModal() {
  const { setIsModalOpen, setTargetComment, setTargetReply } = useModalContext()

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
      console.log('BOOOM')
      setTargetReply(null)
    }
  }

  return { openModal, closeModal }
}
