import React, { useMemo, useState, useEffect } from "react";
import Register from "./pages/anyRole/Register";
import Login from "./pages/anyRole/Login";
import Home from "./pages/anyRole/Home";
import AddSubject from "./pages/promotor/AddSubject";
import ApproveSubjects from "./pages/coordinator/ApproveSubjects";
import SubjectDetail from "./components/Subjects/SubjectDetail";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import ProtectedRoute from "./components/Authenticate/ProtectedRoute";
import AssignPromotors from "./pages/coordinator/AssignPromotors";
import AssignSubjectToStudent from "./pages/coordinator/AssignSubjectToStudent";
import Users from "./pages/admin/Users";
import Favorites from "./pages/student/Favorites";
import Selection from "./pages/student/Selection";
import PromotorDetail from "./pages/student/PromotorDetail";
import BoostStudent from "./pages/promotor/BoostStudent";
import AssignedSubject from "./pages/student/AssignedSubject";

function App() {

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* any role */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />
          <Route path="/promotors/:id" element={<PromotorDetail />} />

          {/* promotor */}
          <Route path="/addSubject" element={<AddSubject />} />
          <Route path="/promotor/boostStudent" element={<BoostStudent />} />

          {/* coordinator */}
          <Route path="/approveSubjects" element={<ApproveSubjects />} />
          <Route path="/assignPromotors" element={<AssignPromotors />} />
          <Route path="/assignSubjects" element={<AssignSubjectToStudent />} />
          {/* </Route> */}

          {/* admin */}
          <Route path="/admin/users" element={<Users/>} />

          {/* student */}
          <Route path="/student/favorites" element={<Favorites />} />
          <Route path="/student/selection" element={<Selection />} />
          <Route path="/student/assignedSubject" element={<AssignedSubject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
