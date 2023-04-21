

// components 
import CommentContainer from "./components/CommentContainer"
import CommentForm from "./components/CommentForm"
// import Modal from "./components/Modal"


function App() {
  
  

  return (
    // when modal open max-height 100vh overflow hidden
    <section className='font-rubik text-neutral-grayish-blue'>
      <CommentContainer />
      <CommentForm btnText="send" placeholder="Add a comment..." />
      {/* <Modal /> */}
    </section>
  )


}

export default App
