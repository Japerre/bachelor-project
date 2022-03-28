import { Link } from "react-router-dom";

const Subjects = ({ subjects }) => {
    return (
        <main>
            <h1> Subjects </h1>
            <Link to="/subjects/createSubject" className="ui-button">ADD SUBJECT</Link>
            {subjects.map((subject) =>(
                <div className="subject-preview" key={subject.onderwerpId} >
                    <Link to={`/subjects/${subject.onderwerpId}`}>
                        <h2>{ subject.titel }</h2>
                        <p> {subject.omschrijving }</p>
                    </Link>
                </div>
            ))}
        </main>
    )
}

export default Subjects