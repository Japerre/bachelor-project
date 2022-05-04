import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import StudentSubject from "../../components/Subjects/StudentSubject";
import axios from "axios";

const AssignSubjectToStudent = () => {
    // authentication
    const [user, setUser] = useState({});
    const [selectedSubjects, setSelectedSubjects] = useState([])
    const navigate = useNavigate();
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

    useEffect(()=>{
        const getSubjects = () => {
            axios
                .get("http://localhost:8080/studentPreferences/getSelectedSubjects", {
                    headers: {authorization: localStorage.getItem("token")},
                }).then((data) => {
                    setSelectedSubjects(data.data.map((studentSubject)=>(
                        console.log(studentSubject),
                        <StudentSubject
                            key = {studentSubject.subject.id}
                            studentSubject={studentSubject}
                        />
                        )
                    )
                )
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
            <div className="grid-container">{selectedSubjects}</div>
        </div>
    </main>
  );
}
export default AssignSubjectToStudent;