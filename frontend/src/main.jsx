import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CommentContextProvider } from './context/commentContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { ModalContextProvider } from './context/ModalContext.jsx'
import { AuthModalContextProvider } from './context/AuthModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthModalContextProvider>
      <UserContextProvider>
        <CommentContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </CommentContextProvider>
      </UserContextProvider>
    </AuthModalContextProvider>
  </React.StrictMode>,
)
