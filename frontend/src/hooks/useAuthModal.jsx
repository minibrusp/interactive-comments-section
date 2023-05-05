import useAuthModalContext from "./useAuthModalContext"
import useUserContext from "./useUserContext"

export default function useAuthModal() {
  const { currentUser } = useUserContext()
  const { setIsAuthModalOpen, isAuthModalOpen, authError, setAuthError } = useAuthModalContext()

  const isAuthenticated = () => {
    return currentUser?.token ? true : false
  }

  const openAuthModal = error => {
    setAuthError(error)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setAuthError(null)
    setIsAuthModalOpen(false)
  }

  return { isAuthenticated, openAuthModal, closeAuthModal, isAuthModalOpen, authError }
}
