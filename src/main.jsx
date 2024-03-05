import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext.jsx";
import { ApiProvider } from './context/ApiContext.jsx';






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
      <App />
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>
)
