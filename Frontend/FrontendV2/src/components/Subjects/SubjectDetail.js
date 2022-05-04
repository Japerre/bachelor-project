import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import {FaGraduationCap, FaLongArrowAltLeft} from "react-icons/fa"
import {FaLongArrowAltRight} from "react-icons/fa"
import axios from "axios"
import {MdTopic} from "react-icons/md";
import {FiCrosshair} from "react-icons/fi";
import {TiGroup} from "react-icons/ti";

const SubjectDetail = () => {

    useEffect(() => {
        const subject = fetchSubject()
        const nextSubject = fetchNextSubject()
        const prevSubject = fetchPreviousSubject()
    }, [])


    const [subject, setSubject] = useState({})
    const [nextSubject, setNextSubject] = useState({})
    const [prevSubject, setPrevSubject] = useState({})
    const [promotorList, setPromotorNames] = useState('')
    const [topicsList, setTopicsList] = useState('')
    const [targetAudienceList,setTargetAudienceList] = useState('')
    const id = useParams().id

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
    const fetchNextSubject = async () => {
        axios.get(`http://localhost:8080/subjects/${id}`, {
            headers: {Authorization: localStorage.getItem("token")},
        }).then((data)=>{
            console.log(data)
            setNextSubject(data.data);
        });

    }
    const fetchPreviousSubject = async () => {
        axios.get(`http://localhost:8080/subjects/${id}`, {
            headers: {Authorization: localStorage.getItem("token")},
        }).then((data)=>{
            setPrevSubject(data.data);
        });

    }

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
                <div className="footer-right">
                   Next:
                </div>
                <div className="footer-left">
                   Previous:
                </div>
            </footer>
        </>

    )
}

export default SubjectDetail