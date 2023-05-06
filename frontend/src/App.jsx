import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { ToastContainer } from 'react-toastify';

// layouts 
import Root from "./layouts/Root"

// pages 
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Page404 from "./pages/Page404"


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
      },
      {
        path: "*",
        element: <Page404 />
      }
    ]
  }
])

function App() {

  return (
    <>
      <ToastContainer 
        className="w-[unset] p-4 font-rubik md:p-[unset]"
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
