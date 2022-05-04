const StudentSubject = ({ studentSubject }) => {
  return(
      <main>
          <div className="card">
              <header className="card-header">{studentSubject.subject.title}</header>
          </div>
      </main>
  )
}
export default StudentSubject