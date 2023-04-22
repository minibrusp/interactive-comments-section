

// components 
import CommentContainer from "./components/CommentContainer"
import CommentForm from "./components/CommentForm"
import Modal from "./components/Modal"

import useModalContext from "./hooks/useModalContext"


function App() {
  const { isModalOpen } = useModalContext() 
  return (
    // when modal open max-height 100vh overflow hidden
    <section className={`font-rubik text-neutral-grayish-blue ${isModalOpen ? 'max-h-screen ' : ''} `}>
      <CommentContainer />
      <CommentForm btnText="send" placeholder="Add a comment..." />
      {
        isModalOpen && <Modal />
      }
      
    </section>
  )



}

export default App
