import { useForm, Controller } from "react-hook-form"
import axios from "axios";
import {useState} from "react";



const SelectSubjects = () => {
    const [subjectList, setSubjectList] = useState([])

    const fetchSubjects = async () => {
        const data = await axios.get("http://localhost:8080/subjects",{
            headers:{
                Authorization: localStorage.getItem("token"),
            }
        })
    }

    return (
        <main>


        </main>
    )
}