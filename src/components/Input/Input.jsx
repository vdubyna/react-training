import { forwardRef } from 'react';

const Input = forwardRef(({ type='text', value, placeholder, onChange, onBlur }, ref) => {
  return <input ref={ref} onChange={onChange} type={type} placeholder={placeholder} value={value} onBlur={onBlur} />;
});

export default Input;