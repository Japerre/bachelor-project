import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Subjects from './components/screens/Subjects';
import Subject from './components/screens/Subject';
import Navbar from './components/screens/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';

import axios from 'axios';
import React from 'react';
import './index.css'
import './App.css'


function App(){

    //baseURL for the normal database: 'http://localhost:8080/api/v1'
    //baseURL for the local database: 'http://localhost:5000'

    const [subjects, setSubject] = useState([]);
    const baseURL = 'http://localhost:8080/api/v1';

    React.useEffect(() =>{
        axios.get(`${baseURL}/subjects`).then((response) => {
        setSubject(response.data);
        })
    },[]);

  return (
  <Router>
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/subjects" element={<Subjects subjects={subjects}/>} />
            <Route path="/subjects/:id" element={<Subject />} />
            <Route path="/" element={<Home />} />

        </Routes>
    </div>
  </Router>
  );
}

export default App;
