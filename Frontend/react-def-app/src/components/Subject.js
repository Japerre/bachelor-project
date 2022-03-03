import { useParams } from "react-router-dom";
import useFetch from "./useFetch"

const Subject = () => {

    const { id } = useParams();
    const { data: subject, error, isPending } = useFetch('http://localhost:8080/api/v1/subjects/'+id);
    if(isPending) return <div>Loading...</div>;
    if(error) console.log(error);
    return (
        <main>
            <h1>Detail Page</h1>
            <h2>{ subject?.titel }</h2>
            <p>{ subject?.omschrijving }</p>
            <p> Amount of Students allow for the subject: { subject?.aantalStudenten }</p>
            <h2> Client for the Subject </h2>
            <p>{ subject?.opdrachtgever?.opdrachtgeverId }</p>
        </main>
    );
}

export default Subject