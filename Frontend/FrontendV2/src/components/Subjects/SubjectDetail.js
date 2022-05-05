import {useState, useEffect} from "react"
import {Link, NavLink, useParams} from "react-router-dom"
import {FaGraduationCap, FaLongArrowAltLeft} from "react-icons/fa"
import {FaLongArrowAltRight} from "react-icons/fa"
import axios from "axios"
import {MdTopic} from "react-icons/md";
import {FiCrosshair} from "react-icons/fi";
import {TiGroup} from "react-icons/ti";
import {render} from "react-dom";

const SubjectDetail = () => {

    const [subject, setSubject] = useState({})
    const [promotorList, setPromotorNames] = useState('')
    const [topicsList, setTopicsList] = useState('')
    const [targetAudienceList,setTargetAudienceList] = useState('')
    const id = useParams().id


    useEffect(() => {
        const subject = fetchSubject()
    }, [])

    const fetchSubject = async () => {
        axios.get(`http://localhost:8080/subjects/${id}`, {
            headers: {Authorization: localStorage.getItem("token")},
        }).then((data)=>{
            setSubject(data.data);
            const promotorNames = data.data.promotorList
                .map((promotor) => {
                    return promotor.user.firstName + " " + promotor.user.lastName;
                })
                .join(", ");
            setPromotorNames(promotorNames);
            const topics = data.data.topicList
                .map((topic) => {
                    return topic.name;
                })
                .join(", ");
            setTopicsList(topics)
            const targetAudiences = data.data.targetAudienceList
                .map((targetAudience) => {
                    return targetAudience.majorCode + " " + targetAudience.campus.name;
                })
                .join(", ");
            setTargetAudienceList(targetAudiences);
        });

    };
    return (

        <>
            <div className="subject-detail-title-description">
                <h1 className="align-text-lef">{subject.title}</h1>
                <div className="subject-detail-description">
                    <p>
                        {subject.description}
                    </p>
                </div>
            </div>
            <div className="subject-detail-extra-info">
                <p>
                    <FaGraduationCap /> Promotor:   {promotorList}
                </p>
                <p>
                    <MdTopic /> Topics: {topicsList}
                </p>
                <p>
                    <FiCrosshair /> TargetAudience: {targetAudienceList}
                </p>
                <p>
                    <TiGroup /> {subject.amountOfStudents}
                </p>
            </div>
            <footer className="footer">
                <div className="footer-right" >
                    <NavLink to={`/`} className={"footer-link"} >
                        Next:
                    </NavLink>

                </div>
                <div className="footer-left">
                    <NavLink to={`/`} className={"footer-link"} >
                        Previous:
                    </NavLink>
                </div>
            </footer>
        </>

    )
}

export default SubjectDetail