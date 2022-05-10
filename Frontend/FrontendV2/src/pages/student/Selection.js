import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubjectBar from "../../components/Subject-bar/SubjectBar";

const Selection = () => {
  // authentication
  const [student, setStudent] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/student", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        setStudent(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const [subjectsInCart, setSubjectsInCart] = useState([]);

  const fetchSelectedSubjects = async () => {
    const data = await axios.get(
      `http://localhost:8080/studentPreferences/getSubjectsInCart/4`,
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    console.log(data.data);
    setSubjectsInCart(data.data);
  };

  useEffect(() => {
    fetchSelectedSubjects();
  }, [student]);

  return (
    <div className="selection-container">
      <div className="message-div">
        this is what your cart currently looks like. Give the following subjects
        a star rating. Be carefull! Once you press submit, you can't take it
        back!
      </div>
      <div className="subject-bar-container">
        {subjectsInCart.map((subject) => (
          <SubjectBar key={subject.subjectId} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default Selection;
