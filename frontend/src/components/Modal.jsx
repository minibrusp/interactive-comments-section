/* eslint-disable react/prop-types */

import { useEffect } from "react"
import useComment from "../hooks/useComment"
import useModal from "../hooks/useModal"
import useModalContext from "../hooks/useModalContext"

export default function Modal() {
  const { closeModal } = useModal()
  const { targetComment, targetReply, setTargetReply, setTargetComment } = useModalContext()
  const { deleteComment, deleteReply, isLoading } = useComment()

  const handleBtnConfirmDeleteClick = () => {
      
      if(!targetReply) {
        deleteComment(targetComment)
      } else {
        deleteReply(targetComment, targetReply)
        setTargetReply(null)
      }
      setTargetComment(null)
      
  }

  const handleBtnCancelClick = () => {
    !targetReply 
      ? closeModal()
      : closeModal(targetReply)
  }

  return (
    <div className='delete-modal__container bg-neutral-dark-blue/40 min-h-screen w-full flex items-center justify-center fixed z-10 top-0 left-0'>
      <div className="delete-modal__content bg-neutral-white mx-4 py-6 px-[26px] rounded-lg max-w-[400px] md:px-8">
        <h2 className="delete-modal__title text-neutral-dark-blue font-medium text-xl mb-4 md:text-2xl">Delete comment</h2>
        <p className="delete-modal__text mb-4 ">Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</p>
        <div className="delete-modal__cta flex flex-row justify-start items-center gap-4 w-full md:justify-between md:gap-3">
          <button 
            className='delete-modal__cta__reject min-w-[130.81px] text-base font-medium uppercase text-neutral-white bg-neutral-grayish-blue rounded-lg py-3 px-4 md:min-w-[162.81px] md:px-8'
            onClick={handleBtnCancelClick}
          >
            no, cancel
          </button>
          <button 
            className='delete-modal__cta__approve min-w-[130.81px] text-base font-medium uppercase text-neutral-white bg-primary-soft-red rounded-lg py-3 px-4 md:min-w-[162.81px] md:px-8'
            onClick={handleBtnConfirmDeleteClick}
          >
            { !isLoading && (
              <span>yes, delete</span>
            )}

            {/* { isLoading && (
              <span>Loading...</span>
            )} */}

            { isLoading && (
              <div className="commentform__form__btn__loader block text-center mx-auto">
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-light-gray/30 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>

              </div>
            ) }
            
          </button>
        </div>
      </div>
    </div>
  )
}
