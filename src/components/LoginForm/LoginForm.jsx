import '../../assets/css/LoginForm.css'
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";

const LoginForm = () => {
    return (
        <form className="login-form">
        <Input placeholder="Your full name" />
        <Button text="Login" />
      </form>
  );
}

export default LoginForm;