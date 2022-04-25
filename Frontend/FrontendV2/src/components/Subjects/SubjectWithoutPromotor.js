import { FaGraduationCap, FaHeart } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FiCrosshair, FiLogIn } from "react-icons/fi";
import { MdTopic } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { useState } from "react";
import Select from "react-select";

const SubjectWithoutPromotor = ({ subject, promotors, onSubmit }) => {
  const promotorNames = subject.promotorList
    .map((promotor) => {
      return promotor.user.firstName + " " + promotor.user.lastName;
    })
    .join(", ");

  const targetAudiences = subject.targetAudienceList
    .map((targetAudience) => {
      return targetAudience.majorCode + " " + targetAudience.campus.name;
    })
    .join(", ");

  const topics = subject.topicList
    .map((topic) => {
      return topic.name;
    })
    .join(", ");

  const [selectedPromotorsIdList, setSelectedPromotorsIdList] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedPromotorsIdList(e.map((entry) => entry.value));
  };

  return (
    <div className="card">
      <header className="card-header">{subject.title}</header>

      <div className="card-body">
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
      </div>

      <div className="card-footer">
        <Link to={`/subject/${subject.subjectId}`}>
          <button type="button" className="btn-promotor">
            DETAIL
          </button>
        </Link>
      </div>
      <div className="card-footer">
        <label>select one or more promotors</label>
        <Select
          options={promotors}
          isMulti
          onChange={(e) => handleSelectChange(e)}
        />
        {selectedPromotorsIdList[0] && (
          <button className="btn-submit-promotors" onClick={() => onSubmit(selectedPromotorsIdList, subject.subjectId)}>
            submit promotors
          </button>
        )}
      </div>
    </div>
  );
};

export default SubjectWithoutPromotor;
