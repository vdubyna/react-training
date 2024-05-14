import './App.css'
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Header from "./components/Header/Header.jsx";
import {Routes, Route, NavLink} from "react-router-dom";
import MenuPage from "./pages/Menu.jsx";
import LoginPage from "./pages/Login.jsx";
import MainPage from "./pages/Main.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/menu' element={<MenuPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default App
