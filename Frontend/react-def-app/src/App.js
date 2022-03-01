import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Subjects from './components/Subjects';
import Subject from './components/Subject';
import Navbar from './components/Navbar';
import Home from './components/Home';

import axios from 'axios';
import React from 'react';
import './index.css'
import './App.css'


function App(){

    const [subjects, setSubject] = useState([])
    const baseURL = 'http://localhost:8080/api/v1'

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
            <Route path="/subjects" element={<Subjects subjects={subjects}/>} />
            <Route path="/subjects/:id" element={<Subject />} />
            <Route path="/" element={<Home />} />

        </Routes>
    </div>
  </Router>
  );
}

export default App;
