import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import React from "react";
import {BrowserRouter} from "react-router-dom";
import AuthContextProfider from './contexts/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <AuthContextProfider>
                <App />
            </AuthContextProfider>
        </Provider>
    </BrowserRouter>
  // </React.StrictMode>
)
