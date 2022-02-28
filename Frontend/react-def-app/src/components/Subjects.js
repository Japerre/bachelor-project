import { Link } from "react-router-dom";

const Subjects = ({ subjects }) => {
    return (
        <>
            <main>
                <h1>Subjects</h1>
                {subjects.map((subject) =>(
                    <div className="subject-preview" key={subject.id} >
                        <Link to={`/subjects/${subject.id}`}>
                            <h2>{ subject.title }</h2>
                            <p>{ subject.omschrijving }</p>
                        </Link>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Subjects