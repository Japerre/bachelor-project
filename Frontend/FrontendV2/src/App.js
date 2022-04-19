import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Register from "./pages/anyRole/Register";
import Login from "./pages/anyRole/Login";
import Home from "./pages/anyRole/Home";
import AddSubject from "./pages/promotor/AddSubject";
import ApproveSubjects from "./pages/coordinator/ApproveSubjects";
import SubjectDetail from "./components/Subjects/SubjectDetail";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import ProtectedRoute from "./components/Authenticate/ProtectedRoute";

function App() {
  
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* Private Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/register" element={<Register />} />
          <Route path="/addSubject" element={<AddSubject />} />
          <Route path="/approveSubjects" element={<ApproveSubjects />} />
          {/* </Route> */}

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
