const Input = (props) => {
  const { placeholder, onChange } = props;
  return <input onChange={onChange} type="text" placeholder={placeholder} />
}

export default Input;