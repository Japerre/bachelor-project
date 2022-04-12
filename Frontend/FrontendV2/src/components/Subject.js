import { FaGraduationCap } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FiCrosshair, FiLogIn } from "react-icons/fi";
import { MdTopic } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";



const Subject = ({ subject, onClickDetail }) => {
   
  return (
    <div className="card">
      <header className="card-header">{subject.title}</header>
      <div className="card-body"></div>
      <div className="card-item">
        <FaGraduationCap /> {subject.promotor}
      </div>
      <div className="card-item">
        {" "}
        <FaIdCard /> {subject.coPromotor}
      </div>
      <div className="card-item">
        {" "}
        <FiCrosshair /> {subject.targetGroups}{" "}
      </div>
      <div className="card-item">
        <MdTopic />
        {subject.disciplines}
      </div>
      <div className="card-item">
        {" "}
        <TiGroup /> {subject.amountOfStudents}
      </div>
      <div className="card-footer">
        <Link to={`/subject/${subject.id}`}>
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
