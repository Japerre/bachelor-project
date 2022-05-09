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
        setUser(data.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <nav>
      <Link to="/">
        <img src="/kuleuvenLogo.png" width={200} alt="" />
      </Link>
      <ul className="nav-links">
        {!user.userId && (
          <>
            <Link to="/register">
              <li>Register</li>
            </Link>
          </>
        )}
        <Link to="/login">
          <li>login</li>
        </Link>

        {user.role === "ROLE_STUDENT" && (
          <>
          <Link to="/student/favorites">
            <li>favorites</li>
          </Link>
          <Link to="/student/selection">
            <li>selection</li>
          </Link>
          </>
        )}

        {user.role === "ROLE_PROMOTOR" && (
          <Link  to="/addSubject">
            <li>add subject</li>
          </Link>
        )}

        {user.role === "ROLE_COORDINATOR" && (
          <>
              <Link  to="/approveSubjects">
                  <li>approve subjects</li>
              </Link>
              <Link  to="/assignPromotors">
                  <li>assign promotors</li>
              </Link>
              <Link  to="/assignSubjects">
                    <li>Assign subject to Student</li>
              </Link>
          </>
        )}
        {user.role === "ROLE_ADMIN" && (
          <>
            <Link  to="/admin/users">
              <li>users</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
