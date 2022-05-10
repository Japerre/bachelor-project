

const StudentSubject = ({ studentSubject }) => {
  return(
      <main>
          <div className="card">
              <header className="card-header">{studentSubject.subject.title}</header>
              <p>Student: {studentSubject.student.naam}</p>
          </div>
      </main>
  )
}
export default StudentSubject