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

  useEffect(() => {
    const getSubjects = async () => {
      const data = await axios.get(
        `http://localhost:8080/subjects/getSubjectsByTargetAudience/${student.targetAudience.targetAudienceId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setSubjects(data.data);
    };
    getSubjects();
  }, []);

  return (
    <>
    <h1>showing all subjects with target audience: {student.targetAudience.majorCode + " " + student.targetAudience.campus.name}</h1>
      <div className="subject-container">
        <div className="grid-container">
          <Subjects subjects={subjects} />
        </div>
      </div>
    </>
  );
};

export default HomeStudent;
