import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Subjects from "../../components/Subjects/Subjects";

const Favorites = () => {
  // authentication
  const [student, setStudent] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/student", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        setStudent(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const [subjects, setSubjects] = useState([])

  const getSubjects = async () => {
    const data = await axios.get(
      `http://localhost:8080/studentPreferences/getFavoriteSubjects/${student.studentId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    setSubjects(data.data);
  };

  useEffect(()=>{
    getSubjects()
  },[student])

  return <div><Subjects subjects={subjects}/></div>;
};

export default Favorites;
