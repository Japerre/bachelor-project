import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import StudentSubject from "../../components/Subjects/StudentSubject";
import axios from "axios";
import studentSubject from "../../components/Subjects/StudentSubject";


const AssignSubjectToStudent = () => {
    // authentication
    const [user, setUser] = useState({});
    const [subjectsToAssign, setSubjectsToAssign] = useState([])
    const [studentSubjects, setStudentSubjects] = useState([])
    const navigate = useNavigate();
    let subjectArray = [];
    let studentArray = [];
    useEffect(() => {
        axios
            .get("http://localhost:8080/whoami/user", {
                headers: { authorization: localStorage.getItem("token") },
            })
            .then((data) => {
                if (data.data.role != "ROLE_COORDINATOR") navigate("/");
                setUser(data.data);
            })
            .catch((error) => {
                navigate("/login");
            });
    }, []);

    function fetchSubjectsStudents(data) {
        for (const subject of data) {
            if (!subjectArray.filter(e => e.subjectId === subject.subject.subjectId).length > 0) {
                subjectArray.push(subject.subject)
            }
        }
    }

    useEffect(()=>{
        const getSubjects = () => {
            axios
                .get("http://localhost:8080/studentPreferences/getSelectedSubjects", {
                    headers: {authorization: localStorage.getItem("token")},
                }).then((data) => {
                fetchSubjectsStudents(data.data)
                setSubjectsToAssign(subjectArray.map((subject) => (
                        <StudentSubject
                            key={subject.subjectId}
                            subject={subject}
                            studentSubjects = {data.data}
                        />
                    )
                ))
            }).catch((error) => {
                console.log(error)
            })
        };
        getSubjects();
    },[])

  return (
    <main>
        <h1>Subjects without a student: </h1>
        <div className="subject-container">
            <div className="grid-container">
                {subjectsToAssign}
            </div>
        </div>
    </main>
  );
}
export default AssignSubjectToStudent;