import Subject from "./components/Subjects/Subject";
import Subjects from "./components/Subjects/Subjects";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddSubject from "./pages/AddSubject";
import { useState, useEffect } from "react";
import SubjectDetail from "./components/Subjects/SubjectDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import axios from "axios";
import ProtectedRoute from "./components/Authenticate/ProtectedRoute";

function App() {
  
  // const [subjects, setSubjects] = useState([]);

  // //use effect laadt alles in bij refresh
  // useEffect(() => {
  //   const getSubjects = async () => {
  //     const subjectsFromServer = await fetchSubjects();
  //     const subjects = [];
  //     subjectsFromServer.forEach((subject) => {
  //       const temp = {
  //         id: subject.subjectId,
  //         title: subject.titel,
  //         promotor: "jeroen baert",
  //         coPromotor: "lobke",
  //         targetGroups: "camus deaneyre",
  //         disciplines: "natuurkunde, radiology",
  //         amountOfStudents: subject.aantalStudenten,
  //       };
  //       subjects.push(temp);
  //     });
  //     //console.log(subjects)
  //     setSubjects(subjects);
  //   };

  //   getSubjects();
  // }, []);


  // const fetchSubjects = async () => {
  //   const response = await axios.get("http://localhost:8080/subjects", {
  //     headers: { Authorization: localStorage.getItem("token") },
  //   });
  //   return response.data;
  // };




  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* Private Routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/register" element={<Register/>} />
            <Route path="/addSubject" element={<AddSubject />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
