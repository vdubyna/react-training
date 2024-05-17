import '../../assets/css/LoginForm.css'
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginForm = ({onSubmit}) => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit(username)
        navigate('/');
    }

    return (
        <form className="login-form" onSubmit={handleFormSubmit}>
        <Input onChange={e => setUsername(e.target.value)} placeholder="Your full name" />
        <Button type="submit" text="Login" />
      </form>
  );
}

export default LoginForm;