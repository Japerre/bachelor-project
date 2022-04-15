import Subjects from "../components/Subjects/Subjects";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../components/UserContext";

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getSubjects = async () => {
      const data = await axios.get(
        "http://localhost:8080/subjects/approvedSubjects",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      //console.log(data.data)
      setSubjects(data.data);
    };
    getSubjects();
  }, []);

  return (
    <div className="subject-container">
      <div className="grid-container">
        <Subjects subjects={subjects} />
      </div>
    </div>
  );
};

export default Home;
