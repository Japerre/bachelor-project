import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  // authentication
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      })
      .catch((error) => {});
  }, []);

  const navStyle = {
    color: "white",
  };

  return (
    <nav>
      <Link to="/">
        <img src="/kuleuvenLogo.png" width={200} alt="" />
      </Link>
      <ul className="nav-links">
        {!user.userId && (
          <>
            <Link style={navStyle} to="/register">
              <li>Register</li>
            </Link>
          </>
        )}
        <Link style={navStyle} to="/login">
          <li>login</li>
        </Link>

        {user.role === "ROLE_STUDENT" && (
          <Link style={navStyle} to="/student/favorites">
            <li>favorites</li>
          </Link>
        )}

        {user.role === "ROLE_PROMOTOR" && (
          <Link style={navStyle} to="/addSubject">
            <li>add subject</li>
          </Link>
        )}

        {user.role === "ROLE_COORDINATOR" && (
          <>
            <Link style={navStyle} to="/approveSubjects">
              <li>approve subjects</li>
            </Link>
            <Link style={navStyle} to="/assignPromotors">
              <li>assign promotors</li>
            </Link>
          </>
        )}
        {user.role === "ROLE_ADMIN" && (
          <>
            <Link style={navStyle} to="/admin/users">
              <li>users</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
