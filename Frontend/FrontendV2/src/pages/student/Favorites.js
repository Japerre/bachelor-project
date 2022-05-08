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

  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    const data = await axios.get(
      `http://localhost:8080/subjects/getFavoriteSubjects/${student.studentId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    const subjects = [];
    for (let i = 0; i < data.data.length; i++) {
      const subject = data.data[i].subject;
      subject.inCart = data.data[i].inCart;
      subjects.push(subject);
    }
    console.log(data.data)
    setSubjects(subjects);
  };

  useEffect(() => {
    getSubjects();
  }, [student]);

  const onCartClick = async (subjectId) => {
    const data = await axios.put('')
  }

  return (
    <>
      <h1>favorites</h1>
      <div className="subject-container">
        <div className="grid-container">
          <Subjects subjects={subjects} type="cart" />
        </div>
      </div>
    </>
  );
};

export default Favorites;
