const Button = (props) => {
    const {text, className, handleClickOnButton, type="button"} = props;

    return <button type={type}
                   className={className}
                   onClick={handleClickOnButton}
    >{text}</button>
}

export default Button;