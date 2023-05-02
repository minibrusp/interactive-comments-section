import { Link, NavLink } from "react-router-dom";

export default function Header() {
  
  return (
    <header className="font-rubik text-neutral-grayish-blue bg-neutral-white mb-4 p-4 flex justify-between items-center">
        
      <Link to="/">
        <h1 className="tracking-widest text-2xl text-primary-moderate-blue">CAT</h1>
      </Link>

      <nav className="">
        <ul className="pl-0 flex justify-end items-center gap-2">
          <NavLink to="login">Login</NavLink>
          <NavLink to="signup">Signup</NavLink>
        </ul>
      </nav>

    </header>
  )
}
