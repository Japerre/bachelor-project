import { useForm, Controller} from "react-hook-form";
import Select from "react-select";
import {useEffect, useState} from "react";
import axios from "axios";

const SubjectForBoost = ({ subject,studentList }) => {

    const [students, setStudents] = useState([])
    const [boostedStudent, setBoostedStudent] = useState({})
    let studentListArray = [];
    const {
        handleSubmit,
        control
    } = useForm()

    useEffect(()=>{
        mapStudents()
    },[])

    const fetchBoostedStudent = async (studentId) => {
        await axios
            .get(`https://localhost:8080/studentPreferences/getSelectedSubjects/${subject.subjectId}/${studentId}`)
            .then((data) => {
                console.log(data.data)
                // setBoostedStudent(data.data)
            })
    }
    const onSubmit = (data) => {
        console.log(subject.subjectId)
        console.log(data.boosted.value)
        axios
            .put(
                `http://localhost:8080/studentPreferences/boostStudent/${subject.subjectId}/${data.boosted.value}`)
            .then((response) => {
                    console.log(response);
                    window.location.reload();
                }, (error) => {
                    console.log(error);
                    alert("Operation Failed")
                }
            )
    }
    const mapStudents = () => {
        studentList.map((student) => {
            if (student.amountOfStars !== 0){
                studentListArray.push(student);
            }
        })
        setStudents(studentListArray.map((student) => (
            {
                label: student.firstName+" "+student.lastName+" | amount of stars: "+student.amountOfStars,
                value: student.studentId
            })
            )
        )
        console.log(studentList)
    }

  return(
      <main>
          <div className="card">
              {console.log(subject)}
              <header className="card-header">{subject.title}</header>
              {(!subject.boosted && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                          rules={{required: false}}
                          control={control}
                          name="boosted"
                          render={({field}) => (
                              <Select
                                  placeholder="Select a student to boost"
                                  options={students}
                                  {...field}
                              />
                          )}
                      />
                      <button>Submit</button>
                  </form>
              ))}
              {(subject.boosted && (
                  <p>Boosted Student: </p>
              ))}
          </div>
      </main>
  )
}
export default SubjectForBoost