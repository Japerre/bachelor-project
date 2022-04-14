import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const SubjectDetail = () => {
  
  useEffect(() => {
    const subject = fetchSubject()
  },[])
  
  const [subject, setSubject] = useState({})
  const id = useParams().id


  const fetchSubject = async () => {
    const response = await axios.get(`http://localhost:8080/subjects/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setSubject(response.data)
    console.log(response.data)
    
  };

  return (
    <h1>{subject.description}</h1>
  )
}

export default SubjectDetail