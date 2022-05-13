import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";

const StudentSubject = ({ subject, studentSubjects }) => {

    const [students, setStudents] = useState([])
    let studentsArray = []

    const{
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();
    useEffect(() =>{
        findAllStudents()
    },[])
    function findAllStudents() {
        for (const studentSubject of studentSubjects) {
            if (studentSubject.subject.subjectId === subject.subjectId) {
                studentsArray.push(studentSubject.student)
            }
        }
        setStudents(studentsArray.map((student) => ({
                label: student.user.firstName + " " + student.user.lastName,
                value: student.studentId,
            }
        )))
    }
  return(
      <main>
          <div className="card">

              <header className="card-header">{subject.title}</header>
              <p>Amount of students: {subject.amountOfStudents}</p>
              <form>
                  <Controller
                      shouldUnregister={true}
                      name="student"
                      rules={{ required: false, max: subject.amountOfStudents }}
                      control={control}
                      render={({ field }) => (
                          <Select
                              placeholder = "Select a student"
                              isMulti
                              options={students}
                              {...field}
                          />
                      )}
                  />
              </form>
          </div>
      </main>
  )
}
export default StudentSubject