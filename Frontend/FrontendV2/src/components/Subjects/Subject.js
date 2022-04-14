import { FaGraduationCap } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FiCrosshair, FiLogIn } from "react-icons/fi";
import { MdTopic } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";



const Subject = ({ subject }) => {
  
  console.log(subject)

  const promotorNames = subject.promotorList.map( (promotor) => {return promotor.user.firstName + " " + promotor.user.lastName} ).join(", ")
  
  
  const targetAudiences = subject.targetAudienceList.map( (targetAudience) => {return targetAudience.majorCode + " " + targetAudience.campus.name} ).join(", ")
  

  const topics = subject.topicList.map( (topic) => {return topic.name} ).join(", ")
  


  return (
    <div className="card">
      <header className="card-header">{subject.title}</header>
      <div className="card-body"></div>
      <div className="card-item">
        <FaGraduationCap /> {promotorNames}
      </div>
      <div className="card-item">
        {" "}
        <FiCrosshair /> {targetAudiences}
      </div>
      <div className="card-item">
        <MdTopic />
        {topics}
      </div>
      <div className="card-item">
        {" "}
        <TiGroup /> {subject.amountOfStudents}
      </div>
      <div className="card-footer">
        <Link to={`/subject/${subject.subjectId}`}>
          <button
            type="button"
            className="btn"
          >
            DETAIL
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Subject;
