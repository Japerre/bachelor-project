import { Link } from "react-router-dom";

const Nav = () => {
  
  const navStyle = {
    color: 'white'
  }
  
  return (
    <nav>
      <Link to="/">
        <img src="/kuleuvenLogo.png" width={200} alt=""/>
      </Link>
      <ul className="nav-links">
        <Link style={navStyle} to='/register'>
          <li>Register</li>
        </Link>
        <Link style={navStyle} to='/login'>
          <li>login</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;