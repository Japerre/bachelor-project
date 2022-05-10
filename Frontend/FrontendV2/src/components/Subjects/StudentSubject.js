

const StudentSubject = ({ studentSubject }) => {
    const student = studentSubject.student.user
  return(
      <main>
          <div className="card">
              <header className="card-header">{studentSubject.subject.title}</header>
              <p>Student: {student.firstName + " " + student.lastName}</p>
          </div>
      </main>
  )
}
export default StudentSubject