import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Subjects from './components/screens/Subject/Subjects';
import Subject from './components/screens/Subject/Subject';
import Navbar from './components/screens/Navbar';
import Home from './components/screens/Home';
import Login from "./components/screens/Login/Login";
import AddSubject from "./components/screens/Subject/AddSubject"
import Users from "./components/screens/Users/Users";

import axios from 'axios';
import React from 'react';
import './index.css';
import './App.css';
import AddUser from "./components/screens/Users/AddUser";

function App(){

    //baseURL for the normal database: 'http://localhost:8080/api/v1'
    //baseURL for the local database: 'http://localhost:5000'

    const [subjects, setSubject] = useState([]);
    const [users, setUser] = useState([]);

    const baseURL = 'http://localhost:8080/api/v1';

    React.useEffect(() =>{
        axios.get(`${baseURL}/subjects`).then((response) => {
            setSubject(response.data);
        })
        axios.get(`${baseURL}/users`).then((response) => {
            setUser(response.data);
        })
    },[]);

  return (
  <Router>
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element = {<Login />} />

            <Route path="/subjects" element={<Subjects subjects={ subjects }/>} />
            <Route path="/subjects/:id" element={<Subject />} />
            <Route path="/subjects/createSubject" element={<AddSubject />} />

            <Route path="/users" element = {<Users users={ users }/>} />
            <Route path="/users/createUser" element={<AddUser />} />

        </Routes>
    </div>
  </Router>
  );
}

export default App;
