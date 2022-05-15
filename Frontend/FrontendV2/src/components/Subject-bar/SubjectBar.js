import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Star0 from "./stars/Star0";
import Star1 from "./stars/Star1";
import Star2 from "./stars/Star2";
import Star3 from "./stars/Star3";
import axios from "axios";

const SubjectBar = ({ subject, student, refreshParent, submitted }) => {
  const [refresh, setRefresh] = useState(0);

  const onStarClick = async (amountOfStars) => {
    const data = await axios.put(
      `http://localhost:8080/studentPreferences/setAmountOfStars/${subject.subjectId}/${student.studentId}/${amountOfStars}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    refreshParent();
  };

  return (
    <div className="subject-bar">
      <div>{subject.title}</div>
      {subject.amountOfStars == 0 && (
        <Star0 onStarClick={onStarClick} submitted={submitted} />
      )}
      {subject.amountOfStars == 1 && (
        <Star1 onStarClick={onStarClick} submitted={submitted} />
      )}
      {subject.amountOfStars == 2 && (
        <Star2 onStarClick={onStarClick} submitted={submitted} />
      )}
      {subject.amountOfStars == 3 && (
        <Star3 onStarClick={onStarClick} submitted={submitted} />
      )}
    </div>
  );
};

export default SubjectBar;
