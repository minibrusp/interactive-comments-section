import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

// layouts 
import Root from "./layouts/Root"

// pages 
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
])

function App() {

  return (
    <>
      <ToastContainer 
        className="w-[unset] font-rubik md:w-[unset]"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <span className="w-1/2 font-rubik"></span> */}
      <RouterProvider router={router} />
    </>
  )



}

export default App
