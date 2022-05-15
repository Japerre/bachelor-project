import {useState, useEffect} from "react"
import {Link, useLocation, useNavigate, useParams} from "react-router-dom"
import {FaGraduationCap, FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa"
import axios from "axios"
import {MdTopic} from "react-icons/md";
import {FiCrosshair} from "react-icons/fi";
import {TiGroup} from "react-icons/ti";
import {BiWorld, BiEnvelope} from "react-icons/bi";

const SubjectDetail = () => {

    const [subject, setSubject] = useState({})
    const [nextSubject, setNextSubject] = useState({})
    const [prevSubject, setPrevSubject] = useState({})
    const [promotorList, setPromotorNames] = useState([])
    const [topicsList, setTopicsList] = useState([])
    const [targetAudienceList,setTargetAudienceList] = useState('')
    const [employer, setEmployer] = useState({})
    const id = useParams().id
    const location = useLocation()
    const subjects = location.state.subjects
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    let amountOfStudents;

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8080/whoami/user", {
    //             headers: { authorization: localStorage.getItem("token") },
    //         })
    //         .then((data) => {
    //             setUser(data.data);
    //         })
    //         .catch((error) => {
    //             navigate("/login");
    //         });
    // }, []);


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
            fetchEmployer(data.data)
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
        if (subjects.length !== 0){
            const currentIndex = indexOfObject(subjects, "subjectId", id)
            setNextSubject(subjects[currentIndex + 1])
            setPrevSubject(subjects[currentIndex - 1])
        }
    }

    const fetchEmployer = async (subjectData) => {
        console.log(subjectData.employer.employerId)
        if (subjectData.employer.type === "company") {
            axios.get("http://localhost:8080/companies/getCompanies", {
                headers: {authorization: localStorage.getItem("token")},
            }).then((data) => {
                console.log(data.data)
                setEmployer(data.data.find(company => company?.employer?.employerId === subjectData?.employer?.employerId ))
            }).catch((error) => {
                console.log(error)
            })

        } else if (subjectData.employer.type === "researchGroup") {
            axios.get("http://localhost:8080/researchGroups/getResearchGroups", {
                headers: {authorization: localStorage.getItem("token")},
            }).then((data) => {
                console.log(data.data)
                console.log(data.data.find(researchGroup => researchGroup?.employer.find(employer => employer?.employerId === subjectData?.employer?.employerId)))
                setEmployer(data.data.find(researchGroup => researchGroup?.employer.find(employer => employer?.employerId === subjectData?.employer?.employerId)))
            }).catch((error) => {
                console.log(error)
            })
        }
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
                    {employer?.researchGroupId && (
                        <div>
                            <h2>Research group: {employer.name}</h2>
                        </div>
                    )}
                    {employer?.companyId && (
                        <div>
                            <h2>Company: {employer.companyName}</h2>
                            <h4>Contact person: {employer.contactPersonFirstName +" "+employer.contactPersonLastName}</h4>
                            <p>
                                <BiEnvelope /> {employer.contactPersonEmail}
                            </p>
                            <p> <BiWorld/> <a href={employer.website}  target="_blank">{employer.website}</a> </p>

                        </div>
                    )}
                </div>
            </div>
            {subjects.length !== 0 && (
                <footer className="footer">
                    <div className="footer-right">
                        {nextSubject &&
                            <Link to={`/subject/${nextSubject.subjectId}`} state={{subjects}}>
                                <div className={"footer-link"}>
                                    Next Subject <FaLongArrowAltRight/>
                                </div>

                            </Link>
                        }

                    </div>
                    <div className="footer-left">
                        {prevSubject &&
                            <Link to={`/subject/${prevSubject.subjectId}`} state={{subjects}}>
                                <div className={"footer-link"}>
                                    <FaLongArrowAltLeft/> Previous Subject
                                </div>
                            </Link>}
                    </div>
                </footer>
            )}
        </>

    )
}

export default SubjectDetail