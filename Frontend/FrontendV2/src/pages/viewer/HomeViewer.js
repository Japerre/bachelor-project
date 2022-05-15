import { useEffect, useState } from "react";
import axios from "axios";
import Subjects from "../../components/Subjects/Subjects";
import { Link } from "react-router-dom";

const HomeViewer = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  // authentication
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      });
  }, []);
  useEffect(() => {
    const getSubjects = async () => {
      const data = await axios.get(
        "http://localhost:8080/subjects/approvedSubjects",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setSubjects(data.data);
      setSubjectList(data.data);
    };
    getSubjects();
  }, []);

  const filterSubjects = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(subjectList);
    const filteredSubjects = subjectList.filter((subject) =>
      `${subject.title} ${JSON.stringify(
        subject.promotorList
      )} ${JSON.stringify(subject.topicList)} ${JSON.stringify(
        subject.targetAudienceList
      )}} `
        .toLowerCase()
        .includes(value)
    );
    setSubjects(filteredSubjects);
  };

  return (
    <>
      {!user.userId && (
        <center>
          <div>
            <h1>you are currently not logged in</h1>
            <Link to={"/login"}>
              <button style={{ cursor: "pointer" }}>login</button>
            </Link>
          </div>
        </center>
      )}

      <div className="search">
        <input
          className="searchbar"
          placeholder="search on title, topics, promotors..."
          onInput={filterSubjects}
        />
      </div>

      <div className="subject-container">
        <div className="grid-container">
          <Subjects subjects={subjects} />
        </div>
      </div>
    </>
  );
};

export default HomeViewer;
