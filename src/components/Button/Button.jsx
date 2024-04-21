const Button = (props) => {
  const { text, type="button" } = props;
  return <button type={type}>{text}</button>
}

export default Button;