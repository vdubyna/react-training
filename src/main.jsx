import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import AuthContextProfider from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
        <AuthContextProfider>
            <App />
        </AuthContextProfider>
    </BrowserRouter>
  // </React.StrictMode>,
)
