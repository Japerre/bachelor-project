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
        <Link style={navStyle} to="/addSubject">
          <li>add subject</li>
        </Link>
        <Link style={navStyle} to="/approveSubjects">
          <li>approve subjects</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;