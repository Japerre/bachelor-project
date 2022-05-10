import React from "react";
import { ImCross } from "react-icons/im";

const SubjectBar = ({ subject }) => {
  return (
    <div className="subject-bar">
      {subject.title}
      <button className="detail-btn">DETAIL</button>
      {/* <button className="remove-btn"><ImCross /></button> */}
    </div>
  );
};

export default SubjectBar;
