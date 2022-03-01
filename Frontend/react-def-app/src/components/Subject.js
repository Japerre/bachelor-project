import { useParams } from "react-router-dom";
import useFetch from "./useFetch"

const Subject = () => {

    const { id } = useParams();
    const {data: subject, error, isPending } = useFetch('http://localhost:3000/subjects/'+id);
    if(isPending) return <div>Loading...</div>;
    if(error) console.log(error);
    return (
        <main>
            <h1>Detail Page</h1>
            <h2>{ subject?.titel }</h2>
            <p>{ subject?.omschrijving }</p>
        </main>
    );
}

export default Subject