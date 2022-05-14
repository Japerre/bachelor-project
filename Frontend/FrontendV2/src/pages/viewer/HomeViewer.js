import { useEffect, useState } from "react";
import axios from "axios";
import Subjects from "../../components/Subjects/Subjects";
import { Link } from "react-router-dom";

const HomeViewer = () => {
  const [subjects, setSubjects] = useState([]);

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

  //authentication
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        console.log(data.data)
        setUser(data.data);
      });
  }, []);

  return (
    <>
      {!user.userId && (
        <div>
          <h1>you are currently not logged in</h1>
          <Link to={"/login"}>
            <button style={{ cursor: "pointer" }}>login</button>
          </Link>
        </div>
      )}

      <div className="subject-container">
        <div className="grid-container">
          <Subjects subjects={subjects} />
        </div>
      </div>
    </>
  );
};

export default HomeViewer;
