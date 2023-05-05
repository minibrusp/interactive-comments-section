import { Link, NavLink } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import UserAvatar from "./UserAvatar";
import { useState } from "react";

// assets 
import logo from '../assets/images/favicon.png'

export default function Header() {
  const { currentUser, dispatch } = useUserContext()

  const [ showLogoutBtn, setShowLogoutBtn ] = useState(false)

  const handleAvatarClick = () => {
    setShowLogoutBtn(prevState => !prevState)
  }

  const handleLogoutBtnClick = () => {
    setShowLogoutBtn(false)
    dispatch({ type: 'USER_LOGOUT' })
    localStorage.removeItem('user');
  }
  
  return (
    <header className="font-rubik text-neutral-grayish-blue bg-neutral-white mb-4 p-4 flex justify-between items-center max-w-[733px] mx-auto">
        
      <Link to="/">
        <h1 className="tracking-widest text-2xl text-primary-moderate-blue">
          <span className="hidden">CAT</span>
          <div className="flex justify-center">
            <img 
              alt="CAT logo"
              className="h-10 w-10"
              src={logo}
              />
          </div>
        </h1>
        
      </Link>

      {!currentUser?.token 
        && 
          <nav className="">
            <ul className="pl-0 flex justify-end items-center gap-2">
              <NavLink to="login">Login</NavLink>
              <NavLink to="signup">Signup</NavLink>
            </ul>
          </nav>
      }
      { currentUser?.token && 
          <div className="flex flex-col justify-center items-center relative">

            <div 
              className="cursor-pointer flex justify-center items-center"
              onClick={handleAvatarClick}
            >
              <UserAvatar />
            </div>
            {
              showLogoutBtn && (
                <div 
                  className="absolute right-0 -bottom-11 bg-neutral-white p-2 border shadow-md cursor-pointer"
                  onClick={handleLogoutBtnClick}
                >
                  <span className="text-primary-soft-red font-medium">Logout</span>
                </div>
              )
            }
            
          </div>
      }

    </header>
  )
}
