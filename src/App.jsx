import './App.css'
import Header from "./components/Header/Header.jsx";
import {Routes, Route} from "react-router-dom";
import MenuPage from "./pages/Menu.jsx";
import LoginPage from "./pages/Login.jsx";
import MainPage from "./pages/Main.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import OrderNewPage from "./pages/OrderNew.jsx";

function App() {

    return (
        <>
            <Header />
            <div className="wrapper">
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/menu' element={<MenuPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/order/new' element={<OrderNewPage />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </div>
        </>
    )
}

export default App
