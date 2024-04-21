const Button = (props) => {
  // eslint-disable-next-line react/prop-types
  const { text, type } = props;
  console.log(props);
  return <button type={type}>{text}</button>
}

export default Button;