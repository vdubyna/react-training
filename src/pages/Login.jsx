import LoginForm from "../components/LoginForm/LoginForm.jsx";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {useContext} from "react";

const LoginPage = function () {

    const {isAuth, onAuthorize, username} = useContext(AuthContext)

    if (isAuth) {
        return (
            <>
                <h3>Hello {username}. You are already logged in.</h3>
                <div>Visit menu to continue purchases. <NavLink to='/menu'>Menu</NavLink></div>
            </>
        );
    }

    return (<div><LoginForm onSubmit={onAuthorize}/></div>);
};

export default LoginPage;
