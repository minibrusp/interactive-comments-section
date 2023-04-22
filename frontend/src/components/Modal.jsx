/* eslint-disable react/prop-types */

import useModal from "../hooks/useModal"
import useModalContext from "../hooks/useModalContext"

export default function Modal() {

  const { closeModal, modalDeleteConfirm } = useModal()
  const { targetComment } = useModalContext()

  return (
    <div className='delete-modal__container bg-neutral-dark-blue/40 min-h-screen w-full flex items-center justify-center fixed z-10 top-0 left-0'>
      <div className="delete-modal__content bg-neutral-white mx-4 py-6 px-[26px] rounded-lg max-w-[385px]">
        <h2 className="delete-modal__title text-neutral-dark-blue font-medium text-xl mb-4">Delete comment</h2>
        <p className="delete-modal__text mb-4">Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</p>
        <div className="delete-modal__cta flex flex-row justify-start items-center gap-4 w-full">
          <button 
            className='delete-modal__cta__reject text-base font-medium uppercase text-neutral-white bg-neutral-grayish-blue rounded-lg py-3 px-4'
            onClick={() => closeModal()}
          >
            no, cancel
          </button>
          <button 
            className='delete-modal__cta__approve text-base font-medium uppercase text-neutral-white bg-primary-soft-red rounded-lg py-3 px-4'
            onClick={() => modalDeleteConfirm(targetComment)}
          >
            yes, delete
          </button>
        </div>
      </div>
    </div>
  )
}
