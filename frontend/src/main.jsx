import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CommentContextProvider } from './context/commentContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CommentContextProvider>
        <App />
      </CommentContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
