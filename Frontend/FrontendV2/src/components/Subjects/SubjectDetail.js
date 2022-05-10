import {useState, useEffect} from "react"
import {Link, useLocation, useNavigate, useParams} from "react-router-dom"
import {FaGraduationCap, FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa"
import axios from "axios"
import {MdTopic} from "react-icons/md";
import {FiCrosshair} from "react-icons/fi";
import {TiGroup} from "react-icons/ti";
import {IconContext} from "react-icons";
import {BsCheckLg} from "react-icons/bs";
import {ImCross} from "react-icons/im";

const SubjectDetail = () => {

    const [subject, setSubject] = useState({})
    const [nextSubject, setNextSubject] = useState({})
    const [prevSubject, setPrevSubject] = useState({})
    const [promotorList, setPromotorNames] = useState([])
    const [topicsList, setTopicsList] = useState([])
    const [targetAudienceList,setTargetAudienceList] = useState('')
    const id = useParams().id
    const location = useLocation()
    const subjects = location.state.subjects

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:8080/whoami/user", {
                headers: { authorization: localStorage.getItem("token") },
            })
            .then((data) => {
                setUser(data.data);
            })
            .catch((error) => {
                navigate("/login");
            });
    }, []);
    useEffect(() => {
        const subject = fetchSubject()
    }, [nextSubject, prevSubject])

    useEffect(() => {
        findNextPrevSubject()
    })

    const fetchSubject = async () => {
        axios.get(`http://localhost:8080/subjects/${id}`, {
            headers: {Authorization: localStorage.getItem("token")},
        }).then((data)=>{
            setSubject(data.data);
            const promotorNames = data.data.promotorList
                .map((promotor) => {
                    return <Link
                        to={`/promotors/${promotor.promotorId}`}
                        state={{promotor}}
                        className={"subject-link-promotor"}>
                        {promotor.user.firstName + " " + promotor.user.lastName}
                    </Link>;
                });
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

    function indexOfObject(arr, key, value) {
        let j = -1
        const result = arr.some(function (obj, i) {
            j++
            return obj[key] == value
        })
        if (!result) {
            return -1
        } else {
            return j
        }
    }

    function findNextPrevSubject() {
        const currentIndex = indexOfObject(subjects, "subjectId", id)
        setNextSubject(subjects[currentIndex + 1])
        setPrevSubject(subjects[currentIndex - 1])
    }

    return (
        <>
            <div className={"detail-grid-container"}>
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
                <div className="subject-detail-employer-info">

                </div>
            </div>

            <footer className="footer">
                <div className="footer-right" >
                    {nextSubject &&
                        <Link to={`/subject/${nextSubject.subjectId}`} className={"footer-link"} state={{subjects}} >
                            {nextSubject.title} <FaLongArrowAltRight />
                        </Link>
                    }

                </div>
                <div className="footer-left">
                    {prevSubject &&
                        <Link to={`/subject/${prevSubject.subjectId}`} className={"footer-link"} state={{subjects}} >
                            <FaLongArrowAltLeft /> {prevSubject.title}
                        </Link>}
                </div>
            </footer>
        </>

    )
}

export default SubjectDetail