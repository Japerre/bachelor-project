import { useEffect, useState } from "react";
import axios from "axios";
import Subjects from "../../components/Subjects/Subjects";
import { useNavigate } from "react-router-dom";

const HomeStudent = () => {
  const [subjects, setSubjects] = useState([]);

  // authentication
  const [student, setStudent] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/student", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        console.log(data.data);
        setStudent(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const getSubjects = async () => {
    const data = await axios.get(
      `http://localhost:8080/subjects/getSubjectsForStudent/${student.studentId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    const subjects = [];
    for (let i = 0; i < data.data.length; i++) {
      const subject = data.data[i].subject;
      subject.favorite = data.data[i].favorite;
      subjects.push(subject);
    }
    console.log(subjects);
    setSubjects(subjects);
  };

  useEffect(() => {
    getSubjects();
  }, [student]);

  const [refresh, setRefresh] = useState(0)

  const onFavorite = async (subjectId) => {
    const data = await axios.put(
      `http://localhost:8080/studentPreferences/toggleFavorite/${subjectId}/${4}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    setRefresh(refresh+1)
  };

  return (
    <>
      {student.targetAudience && (
        <h1>
          showing all subjects with target audience:{" "}
          {student.targetAudience.majorCode +
            " " +
            student.targetAudience.campus.name}
        </h1>
      )}

      <div className="subject-container">
        <div className="grid-container">
          <Subjects subjects={subjects} type="student" onFavorite={onFavorite} />
        </div>
      </div>
    </>
  );
};

export default HomeStudent;
