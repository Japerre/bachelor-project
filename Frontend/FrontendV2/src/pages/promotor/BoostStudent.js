import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Subjects from "../../components/Subjects/Subjects";
import SubjectForBoost from "../../components/Subjects/SubjectForBoost";

const BoostStudent = () => {
  //authentication
  const [promotor, setPromotor] = useState({});
  const navigate = useNavigate();
  const getFinished = useRef(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/promotor", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        setPromotor(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  },[]);

  const [subjectsForPromotor, setSubjectsForPromotor] = useState([]);
  const [boostedSubjects, setBoostedSubjects] = useState([]);
  let boostedSubjectArray = [];
  let notBoostedSubjectArray = [];

  function processSubjects(data){
    for (const subject of data){
      console.log(subject)
      if(!subject.subject.boosted){
        notBoostedSubjectArray.push(subject)
      }else if(subject.subject.boosted){
        boostedSubjectArray.push(subject)
      }
    }
  }

  function fetchSubjects() {
    const fetchSubjectsForPromotor = async () => {
      const data = await axios.get(
          `http://localhost:8080/studentPreferences/getSubjectsForPromotor/${promotor.promotorId}`,
          {
            headers: {authorization: localStorage.getItem("token")},
          }
      );
      console.log(data.data)
      processSubjects(data.data)
      setSubjectsForPromotor(notBoostedSubjectArray.map((subjectForBoost) => (
          console.log(subjectForBoost),
              <SubjectForBoost
                  subject={subjectForBoost.subject}
                  studentList={subjectForBoost.studentList}
              />
      )))
      setBoostedSubjects(boostedSubjectArray.map((boostedSubject) => (
          <SubjectForBoost
              subject={boostedSubject.subject}
              studentList={boostedSubject.studentList}
          />
      )))
    };
    fetchSubjectsForPromotor();
  }


  useEffect(() => {
    fetchSubjects()
  }, [promotor]);

  return (
      <>
        <h1>Subjects with an avaible boost</h1>
        <div className="subject-container">
          <div className="grid-container">
            {subjectsForPromotor}
          </div>
        </div>
        <h1>Subjects with a boosted student</h1>
        <div className="subject-container">
          <div className="grid-container">
            {boostedSubjects}
          </div>
        </div>
      </>
  );
};

export default BoostStudent;
