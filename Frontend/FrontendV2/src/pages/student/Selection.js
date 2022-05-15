import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubjectBar from "../../components/Subject-bar/SubjectBar";
import { Link } from "react-router-dom";

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
  const [submitted, setSubmitted] = useState(false);

  const fetchSelectedSubjects = async () => {
    const data = await axios.get(
      `http://localhost:8080/studentPreferences/getSubjectsInCart/${student.studentId}`,
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    const subjects = [];
    for (let i = 0; i < data.data.length; i++) {
      const subject = data.data[i].subject;
      subject.favorite = data.data[i].favorite;
      subject.submitted = data.data[i].submitted;
      subject.amountOfStars = data.data[i].amountOfStars;
      subjects.push(subject);
    }

    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].submitted) setSubmitted(true);
    }

    setSubjectsInCart(subjects);
  };

  const submitSelection = async () => {
    let valid = true;
    for (let i = 0; i < subjectsInCart.length; i++) {
      if (subjectsInCart[i].amountOfStars === 0) valid = false;
    }
    if (subjectsInCart.length === 3 && valid) {
      const idList = subjectsInCart.map((subject) => subject.subjectId);
      const data = await axios.put(
        `http://localhost:8080/studentPreferences/submitSelection`,
        idList,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
    } else {
      alert("every subject must have at least 1 star");
    }
    refreshParent();
  };

  const [refresh, setRefresh] = useState(0);

  const refreshParent = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    fetchSelectedSubjects();
  }, [student, refresh]);

  return (
    <div className="selection-container">
      {submitted ? (
        <>
          <div className="message-div" style={{ background: "green" }}>
            you have sucessfully submitted the following 3 subjects. Check{" "}
            <Link to={"/student/assignedSubject"} style={{ color: "purple" }}>
              here
            </Link>{" "}
            to see if there has been a subject assigned to you!
          </div>
          <div className="subject-bar-container">
            {subjectsInCart.map((subject) => (
              <SubjectBar
                key={subject.subjectId}
                subject={subject}
                student={student}
                refreshParent={refreshParent}
                submitted={true}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="message-div">
            this is what your cart currently looks like. Give the following
            subjects a star rating. Be carefull! Once you press submit, you
            can't take it back! You have to submit exactly 3 subjects. Every
            subject must have at least one star.
          </div>
          {subjectsInCart.length === 0 ? (
            <div
              className="message-div"
              style={{ backgroundColor: "white", color: "black" }}
            >
              selection cart is empty. Add some subjects to your cart in the
              favorites page!
            </div>
          ) : (
            <div>
              <div className="subject-bar-container">
                {subjectsInCart.map((subject) => (
                  <SubjectBar
                    key={subject.subjectId}
                    subject={subject}
                    student={student}
                    refreshParent={refreshParent}
                    submitted={false}
                  />
                ))}
              </div>
              {subjectsInCart.length === 3 && (
                <button
                  onClick={submitSelection}
                  className="btn-submit-promotors"
                >
                  SUBMIT
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Selection;
