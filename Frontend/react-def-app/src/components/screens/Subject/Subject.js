import { useParams } from "react-router-dom";
import useFetch from "../../functions/useFetch"

const Subject = () => {
    const { id } = useParams();

    //'http://localhost:8080/api/v1/subjects/' for the normal database
    // 'http://localhost:5000/subjects/' for the local database via: npm run server db.json
    const { data: subject, error, isPending } = useFetch('http://localhost:8080/api/v1/subjects/' +id);

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