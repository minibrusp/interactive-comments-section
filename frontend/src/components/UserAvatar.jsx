import useUserContext from "../hooks/useUserContext"


export default function UserAvatar() {
  const { currentUser } = useUserContext()

  return (
    <>
      {
        currentUser.token 
          ? <img className='comment__avatar h-8 w-8' src={currentUser.avatar} alt="user image avatar" />
          : <img className='comment__avatar h-8 w-8' src={currentUser.image} alt="user image avatar" />
      }
    
    </>
    
  
  )
}
