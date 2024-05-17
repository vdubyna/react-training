import Input from "../Input/Input.jsx";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx"

const Header = () => {
    const {isAuth, onLogout, username} = useContext(AuthContext)

    return (
        <header className="header">
            <NavLink className="logo" to='/'>Pizza Day</NavLink>
            <nav className='nav'>
                <NavLink to='/menu'>Menu</NavLink>
            </nav>
            <div>{isAuth ? username : <NavLink to='/login'>Login</NavLink>}</div>
            {isAuth && <button onClick={onLogout}>Logout</button>}
            <form>
                <Input placeholder="Search for the order #"/>
            </form>
        </header>
    );
}

export default Header;
