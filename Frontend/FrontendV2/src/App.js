import Subject from "./components/Subject";
import Subjects from "./components/Subjects";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import SubjectDetail from "./components/SubjectDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import axios from "axios";

function App() {
  const [subjects, setSubjects] = useState([]);

  //use effect laadt alles in bij refresh
  useEffect(() => {
    const getSubjects = async () => {
      const subjectsFromServer = await fetchSubjects();
      const subjects = [];
      subjectsFromServer.forEach((subject) => {
        const temp = {
          id: subject.subjectId,
          title: subject.titel,
          promotor: "jeroen baert",
          coPromotor: "lobke",
          targetGroups: "camus deaneyre",
          disciplines: "natuurkunde, radiology",
          amountOfStudents: subject.aantalStudenten,
        };
        subjects.push(temp);
      });
      //console.log(subjects)
      setSubjects(subjects);
    };

    getSubjects();
  }, []);


  const fetchSubjects = async () => {
    const response = await axios.get("http://localhost:8080/subjects", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    return response.data;
  };

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home subjects={subjects} />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
