import useUserContext from "../hooks/useUserContext"


export default function UserAvatar() {
  const { currentUser } = useUserContext()

  return (
    <>
      {
        currentUser.token 
          ? <img className='comment__avatar h-8 w-8 rounded-full' src={currentUser.avatar} alt="user image avatar" />
          : <img className='comment__avatar h-8 w-8 rounded-full' src={currentUser.image} alt="user image avatar" />
      }
    
    </>
    
  
  )
}
