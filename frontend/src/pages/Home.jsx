

// components 
import AuthModal from "../components/AuthModal"
import CommentContainer from "../components/CommentContainer"
import CommentForm from "../components/CommentForm"
import Modal from "../components/Modal"


import useAuthModalContext from "../hooks/useAuthModalContext"
import useModalContext from "../hooks/useModalContext"


function Home() {
  const { isModalOpen } = useModalContext() 
  const { isAuthModalOpen } = useAuthModalContext()
  return (
    // when modal open max-height 100vh overflow hidden
    <section className={`font-rubik text-neutral-grayish-blue mx-4 ${isModalOpen ? 'max-h-screen ' : ''} `}>
      <CommentContainer />
      <CommentForm btnText="send" placeholder="Add a comment..." />
      {
        isModalOpen && <Modal />
      }
      {
        isAuthModalOpen && <AuthModal />
      }
      
    </section>
  )



}

export default Home
