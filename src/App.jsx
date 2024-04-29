import './App.css'
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";

function App() {

    return (
        <>
            <Header />
            <div className="wrapper">
                <main className="content">
                    <h1 className="title">The best pizza.<br/><span className="text-yellow">Straight out of the oven, straight to you.</span>
                    </h1>
                    <p className="sub-title">👋 Welcome! Please start by telling us your name:</p>
                    <LoginForm />
                </main>
            </div>
            <Menu />
        </>
    )
}

export default App
