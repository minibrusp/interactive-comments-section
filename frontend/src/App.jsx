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
      <RouterProvider router={router} />
    </>
  )



}

export default App
