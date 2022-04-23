import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Subject from "../../components/Subjects/Subject";


const AssignPromotors = () => {
  // authentication
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        if (data.data.role != "ROLE_COORDINATOR") navigate("/");
        setUser(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const [subjectsWithoutPromotor, setSubjectsWithoutPromotor] = useState([]);

  const fetchSubjectsWithoutPromotor = () => {
    axios
      .get("http://localhost:8080/subjects/subjectsWithoutPromotor", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        console.log(data.data);
        setSubjectsWithoutPromotor(
          data.data.map((subject) => (
            <Subject
              key={subject.subjectId}
              subject={subject}
              type="withoutPromotor"
            />
          ))
        );
      });
  };

  useEffect(() => {
    fetchSubjectsWithoutPromotor();
  }, []);

  return (
    <div>
      <h1>subjects without promotor: </h1>
      <div className="subject-container">
        <div className="grid-container">{subjectsWithoutPromotor}</div>
      </div>
    </div>
  );
};

export default AssignPromotors;
