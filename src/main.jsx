import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { UserProvider } from './context';

axios.defaults.baseURL = 'https://backend-deploy-production-416b.up.railway.app/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
      <UserProvider>
        <App/>
      </UserProvider>
   </BrowserRouter> 
  </React.StrictMode>,
)
