import React, { useMemo, useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddSubject from "./pages/AddSubject";
import ApproveSubjects from "./pages/ApproveSubjects";
import SubjectDetail from "./components/Subjects/SubjectDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import ProtectedRoute from "./components/Authenticate/ProtectedRoute";

function App() {
  
  return (
    <Router>
      <div>
        <Nav />
          <Routes>
            {/* Private Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/addSubject" element={<AddSubject />} />
              <Route path="/approveSubjects" element={<ApproveSubjects />} />
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
