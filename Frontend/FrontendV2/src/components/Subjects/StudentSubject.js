import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import axios from "axios";

const StudentSubject = ({ subject,studentSubjects }) => {

    const [assignedStudents, setAssignedStudents] = useState([])
    const [students, setStudents] = useState([])
    let studentsArray = [];
    let assignedStudentsArray = [];

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();
    useEffect(() => {
        findAllStudents()
    }, [])

    function findAllStudents() {
        for (const studentSubject of studentSubjects) {
            if (studentSubject.subject.subjectId === subject.subjectId) {
                if (!studentSubject.student.assignedSubjects) {
                    studentsArray.push(studentSubject.student)
                } else if(studentSubject.student.assignedSubjects && studentSubject.subject.subjectId === subject.subjectId){
                    assignedStudentsArray.push(studentSubject.student);
                }
            }
        }
        setStudents(studentsArray.map((student) => (
            {
                label: student.user.firstName + " " + student.user.lastName,
                value: student.studentId,
            }
        )))
        setAssignedStudents(assignedStudentsArray.map((student) => (
            {
                label: student.user.firstName + " " + student.user.lastName,
                value: student.studentId,
            }
        )))
    }

    const onSubmit = (data) => {
        setAssignedStudents(data.assignedStudents)
        for (const assignedStudent of data.assignedStudents) {
            console.log(assignedStudent.value)
            axios
                .put(`http://localhost:8080/students/assignedSubject/${assignedStudent.value}`, subject)
                .then((response) => {
                    console.log(response);
                    alert("Subject have been assigned");
                    findAllStudents()
                    window.location.reload()
                }, (error) => {
                    console.log(error);
                    alert("Operation Failed")
                })
        }
    }

    return (
            <main>
                <div className="card">
                    <header className="card-header">{subject.title}</header>
                    <p>Amount of students: {subject.amountOfStudents}</p>
                    {(!subject.submitted && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            shouldUnregister={true}
                            name="assignedStudents"
                            rules={{required: false}}
                            control={control}
                            render={({field}) => (
                                <Select
                                    placeholder="Select a student"
                                    isMulti
                                    options={students}
                                    isOptionDisabled={(option) => option.alreadyAssigned}
                                    {...field}
                                />
                            )}
                        />
                        <button>submit</button>
                    </form>
                    ))}
                    {(subject.submitted && (
                        <div>
                            <p>Students:</p>

                            <p>{assignedStudents.map((assignedStudent) => (
                                <li className={"list-item-assigned-students"}>
                                    {assignedStudent.label}
                                </li>
                            ))}</p>
                        </div>
                    ))}
                </div>
            </main>

    )

}
export default StudentSubject