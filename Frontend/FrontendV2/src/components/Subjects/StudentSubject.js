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
                if (!studentSubject.student.assignedSubject) {
                    studentsArray.push(studentSubject)
                } else if(studentSubject.student.assignedSubject && studentSubject.subject.subjectId === subject.subjectId){
                    console.log(assignedStudentsArray)
                    console.log(studentSubject.student)
                    assignedStudentsArray.push(studentSubject);
                }
            }
        }
        setStudents(studentsArray.map((studentSubject) => (
            {
                label: studentSubject.student.user.firstName + " " + studentSubject.student.user.lastName+" | stars: "+studentSubject.amountOfStars+ " | boosted:",
                value: studentSubject.student.studentId,
            }
        )))
        setAssignedStudents(assignedStudentsArray.map((studentSubject) => (
            {
                label: studentSubject.student.user.firstName + " " + studentSubject.student.user.lastName,
                amountOfStars: studentSubject.amountOfStars,
                //boosted: studentSubject.boosted
                value: studentSubject.student.studentId,
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

    function deleteAssigment(subject) {
        for (const assignedStudent of assignedStudents){
            axios
                .put(`http://localhost:8080/students/assignedSubject/${assignedStudent.value}`)
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
                            name="assignedSubject"
                            rules={{required: false}}
                            control={control}
                            render={({field}) => (
                                <Select
                                    placeholder="Select a student"
                                    isMulti
                                    options={students}
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
                                    <div className={"card"}>
                                        <p>{assignedStudent.label}</p>
                                        <p>Amount of stars: {assignedStudent.amountOfStars}</p>
                                    </div>
                                ))}</p>
                            <button className={"remove-btn-studentSubject"} >Delete Assigment</button>
                        </div>
                    ))}
                </div>
            </main>

    )

}
export default StudentSubject