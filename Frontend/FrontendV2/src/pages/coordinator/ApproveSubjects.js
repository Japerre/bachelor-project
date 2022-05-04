import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Subject from "../../components/Subjects/Subject";

const ApproveSubjects = () => {
  const [toReviewSubjects, setToReviewSubjects] = useState([]);
  const [approvedSubjects, setApprovedSubjects] = useState([]);
  const [disapprovedSubjects, setDisapprovedSubjects] = useState([]);
  const [refresh, setRefresh] = useState(0);

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

  const approveSubject = (subject) => {
    axios
      .put(`http://localhost:8080/subjects/approve/${subject.subjectId}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        alert("subject succesfully approved!");
        setRefresh(refresh + 1);
      });
  };

  const disapproveSubject = (subject) => {
    axios
      .put(`http://localhost:8080/subjects/disapprove/${subject.subjectId}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        alert("subject succesfully disapproved!");
        setRefresh(refresh + 1);
      });
  };

  useEffect(() => {
    fetchToReviewSubjects();
    fetchApprovedSubjects();
    fetchDisapprovedSubjects();
  }, [refresh]);

  const fetchToReviewSubjects = () => {
    axios
      .get("http://localhost:8080/subjects/subjectsToReview", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        setToReviewSubjects(
          data.data.map((subject) => (
            <Subject
              key={subject.subjectId}
              subject={subject}
              type="toReview"
              onApprove={approveSubject}
              onDisapprove={disapproveSubject}
            />
          ))
        );
      });
  };

  const fetchApprovedSubjects = () => {
    axios
      .get("http://localhost:8080/subjects/approvedSubjects", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        setApprovedSubjects(
          data.data.map((subject) => (
            <Subject
              key={subject.subjectId}
              subject={subject}
              type="approved"
              onDisapprove={disapproveSubject}
            />
          ))
        );
      });
  };

  const fetchDisapprovedSubjects = () => {
    axios
      .get("http://localhost:8080/subjects/disapprovedSubjects", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        setDisapprovedSubjects(
          data.data.map((subject) => (
            <Subject
              key={subject.subjectId}
              subject={subject}
              type="disapproved"
              onApprove={approveSubject}
              onDelete={deleteSubject}
            />
          ))
        );
      });
  };

  const deleteSubject = (subjectId) => {
    axios
      .delete(`http://localhost:8080/subjects/deleteSubject/${subjectId}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        alert("success");
        setRefresh(refresh + 1);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <h1>subjects to review: </h1>
      <div className="subject-container">
        <div className="grid-container">{toReviewSubjects}</div>
      </div>
      <h1>approved subjects</h1>
      <div className="subject-container">
        <div className="grid-container">{approvedSubjects}</div>
      </div>
      <h1>disapproved subjects</h1>
      <div className="subject-container">
        <div className="grid-container">{disapprovedSubjects}</div>
      </div>
    </>
  );
};

export default ApproveSubjects;
