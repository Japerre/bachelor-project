import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSubject from "../../components/Subjects/StudentSubject";
import Subject from "../../components/Subjects/Subject";
import SubjectAssigned from "../../components/Subjects/SubjectAssigned";

const AssignedSubject = () => {
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

  return (
    <div className="selection-container">
      {student.assignedSubject && student.assignedSubject === null && (
        <div className="message-div">
          <center>You have not been assigned a subject yet.</center>
        </div>
      )}

      {student.assignedSubject && student.assignedSubject !== null && (
        <>
          <div className="message-div" style={{ background: "green" }}>
            <center>You have been assigned to the following subject.</center>
          </div>
          <Subject subject={student.assignedSubject} subjects={[]} type=""/>
        </>
      )}
    </div>
  );
};

export default AssignedSubject;
