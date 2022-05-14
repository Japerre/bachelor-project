import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import StudentSubject from "../../components/Subjects/StudentSubject";
import axios from "axios";
import studentSubject from "../../components/Subjects/StudentSubject";


const AssignSubjectToStudent = () => {
    // authentication
    const [user, setUser] = useState({});
    const [subjectsToAssign, setSubjectsToAssign] = useState([])
    const [assignedSubjects, setAssignedSubjects] = useState([])

    const navigate = useNavigate();
    let subjectToAssignArray = [];
    let assignedSubjectArray = [];

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
            if (!subjectToAssignArray.filter(e => e.subjectId === subject.subject.subjectId).length > 0 && !subject.subject.assigned && subject.submitted) {
                subjectToAssignArray.push(subject.subject)
            } else if(!assignedSubjectArray.filter(e => e.subjectId === subject.subject.subjectId).length > 0 && subject.subject.assigned && subject.submitted){
                assignedSubjectArray.push(subject.subject)
                console.log(assignedSubjectArray);
            }
        }
    }

    const getSubjectsToAssign = () => {
        axios
            .get("http://localhost:8080/studentPreferences/getSelectedSubjects", {
                headers: {authorization: localStorage.getItem("token")},
            }).then((data) => {
            fetchSubjectsStudents(data.data)
            setSubjectsToAssign(subjectToAssignArray.map((subjectToAssign) => (
                    <StudentSubject
                        key={subjectToAssign.subjectId}
                        subject={subjectToAssign}
                        studentSubjects = {data.data}
                    />
                )
            ))
            setAssignedSubjects(assignedSubjectArray.map((assignedSubject) => (
                    <StudentSubject
                        key={assignedSubject.subjectId}
                        subject={assignedSubject}
                        studentSubjects = {data.data}
                    />
                )
            ))
        }).catch((error) => {
            console.log(error)
        })
    };

    useEffect(()=>{
        getSubjectsToAssign();
    },[])

  return (
    <main>
        <h1>Subjects without a student: </h1>
        <div className="subject-container">
            <div className="grid-container">
                {subjectsToAssign}
            </div>
        </div>
        <h1>Assigned Subjects: </h1>
        <div className="subject-container">
            <div className="grid-container">
                {assignedSubjects}
            </div>
        </div>
    </main>
  );
}
export default AssignSubjectToStudent;