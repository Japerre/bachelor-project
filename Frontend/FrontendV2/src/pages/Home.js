import Subjects from "../components/Subjects/Subjects"
import { useState, useEffect } from "react"
import axios from "axios"



const Home = () => {
  
  const [subjects, setSubjects] = useState([]);


  useEffect(()=>{
    const getSubjects = async () => {
      const data = await axios.get("http://localhost:8080/subjects", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      //console.log(data.data)
      setSubjects(data.data)
    }
    getSubjects()
  },[])
  
  
  return (
    <div>
      <Subjects subjects={subjects} />
    </div>
  )
}

export default Home