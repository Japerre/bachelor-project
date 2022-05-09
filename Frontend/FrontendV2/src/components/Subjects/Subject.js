import { FaGraduationCap, FaHeart } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FiCrosshair, FiLogIn } from "react-icons/fi";
import { MdTopic } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsCartCheck, BsCartCheckFill } from "react-icons/bs"
import { useState } from "react";

const Subject = ({
  subject,
  subjects,
  type,
  onApprove,
  onDisapprove,
  onDelete,
  onFavorite,
}) => {
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

  const [refresh, setRefresh] = useState(0);
  return (
    <>
      <div className="card">
        <header className="card-header">
          {subject.title}
          {type === "student" && subject.favorite === false && (
            <AiOutlineStar
              className={"item-right"}
              onClick={() => {
                onFavorite(subject.subjectId);
                subject.favorite=true
              }}
            />
          )}
          {type === "student" && subject.favorite === true && (
            <AiFillStar
              className={"item-right"}
              color="gold"
              onClick={() => {
                onFavorite(subject.subjectId);
                subject.favorite=false
              }}
            />
          )}

          {type === "cart" && subject.inCart === false && (
            <BsCartCheck 
              className="item-right"
            />
          )}

          {type === "cart" && subject.inCart === true && (
            <BsCartCheckFill
              className="item-right"
            />
          )}
        </header>
        <div className="card-body">
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
        </div>

        <div className="card-footer">
          <Link to={`/subject/${subject.subjectId}`} state={{subjects}}>
            <button type="button" className="btn">
              DETAIL
            </button>
          </Link>
          {type === "toReview" && (
            <>
              <IconContext.Provider value={{ color: "green", size: "2em" }}>
                <button
                  onClick={() => {
                    onApprove(subject);
                  }}
                  className="approve-btn"
                >
                  <BsCheckLg />
                </button>
              </IconContext.Provider>
              <IconContext.Provider value={{ color: "red", size: "2em" }}>
                <button
                  onClick={() => onDisapprove(subject)}
                  className="remove-btn"
                >
                  <ImCross />
                </button>
              </IconContext.Provider>
            </>
          )}
          {type === "approved" && (
            <>
              <IconContext.Provider value={{ color: "red", size: "2em" }}>
                <button
                  onClick={() => onDisapprove(subject)}
                  className="remove-btn"
                >
                  <ImCross />
                </button>
              </IconContext.Provider>
            </>
          )}
          {type === "disapproved" && (
            <>
              <IconContext.Provider value={{ color: "green", size: "2em" }}>
                <button
                  onClick={() => {
                    onApprove(subject);
                  }}
                  className="approve-btn"
                >
                  <BsCheckLg />
                </button>
                {/* <BsCheckLg onClick={() => onApprove(subject)}/> */}
              </IconContext.Provider>
              <button onClick={() => onDelete(subject.subjectId)}>
                PERMANENT DELETE
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Subject;
