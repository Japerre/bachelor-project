import { useParams } from "react-router-dom";

const Subject = () => {
    const { id } = useParams();
    return (
    <>
        <main>
            <h3>Subject detail page: { id }</h3>
            <p>the amount of students allowed:</p>

        </main>
    </>
    )
}

export default Subject