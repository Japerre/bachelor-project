import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  // authentication
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        if (data.data.role != "ROLE_ADMIN") navigate("/");
        setUser(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:8080/students", {
        headers: { authorization: localStorage.getItem("token") },
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(()=>{
    fetchStudents()
  },[])

  return (
    <div>
      <h1>students</h1>
      <div className="user-div">
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
        <div className="user-container"></div>
      </div>
    </div>
  );
};

export default Users;
