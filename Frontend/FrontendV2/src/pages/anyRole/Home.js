import Subjects from "../../components/Subjects/Subjects";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeViewer from "../viewer/HomeViewer";
import HomeStudent from "../student/HomeStudent";

const Home = () => {
  const [subjects, setSubjects] = useState([]);

  // authentication
  const [user, setUser] = useState({});
  const navigate = useNavigate();
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

  useEffect(() => {
    const getSubjects = async () => {
      const data = await axios.get(
        "http://localhost:8080/subjects/approvedSubjects",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setSubjects(data.data);
    };
    getSubjects();
  }, []);

  return <>{user.role === "ROLE_STUDENT" ? <HomeStudent /> : <HomeViewer />}</>;
};

export default Home;
