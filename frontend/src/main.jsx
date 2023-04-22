import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CommentContextProvider } from './context/commentContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { ModalContextProvider } from './context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CommentContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </CommentContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
