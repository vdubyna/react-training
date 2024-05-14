import Input from "../Input/Input.jsx";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
      <header className="header">
          <NavLink className="logo" to='/'>Pizza Day</NavLink>
          <nav className='nav'>
              <NavLink to='/menu'>Menu</NavLink>
              <NavLink to='/login'>Login</NavLink>
          </nav>
          <form>
              <Input placeholder="Search for the order #"/>
          </form>
      </header>
  );
}

export default Header;
