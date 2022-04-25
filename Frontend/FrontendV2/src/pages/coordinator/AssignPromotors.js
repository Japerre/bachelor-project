import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubjectWithoutPromotor from "../../components/Subjects/SubjectWithoutPromotor";

const AssignPromotors = () => {
  // authentication
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        if (data.data.role != "ROLE_COORDINATOR") navigate("/");
        setUser(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const [promotorList, setPromotorList] = useState([]);

  const fetchPromotors = async () => {
    const data = await axios.get("http://localhost:8080/promotors", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const promotors = data.data;
    console.log(promotors);

    const promotorsMapping = promotors
      .filter((promotor) => promotor.user.firstName != null)
      .map((promotor) => ({
        label: promotor.user.firstName + " " + promotor.user.lastName,
        value: promotor.promotorId,
      }));

    setPromotorList(promotorsMapping);
  };

  const [subjectsWithoutPromotor, setSubjectsWithoutPromotor] = useState([]);

  const fetchSubjectsWithoutPromotor = async () => {
    const data = await axios.get(
      "http://localhost:8080/subjects/subjectsWithoutPromotor",
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    setSubjectsWithoutPromotor(
      data.data.map((subject) => (
        <SubjectWithoutPromotor
          key={subject.subjectId}
          subject={subject}
          promotors={promotorList}
          onSubmit={submitPromotor}
        />
      ))
    );
  };

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchPromotors();
  }, []);

  useEffect(() => {
    fetchSubjectsWithoutPromotor();
  }, [promotorList]);

  const submitPromotor = (promotorIdList, subjectId) => {
    console.log(promotorIdList);
    axios
      .put(
        `http://localhost:8080/subjects/assignPromotorsToSubject/${subjectId}`,
        promotorIdList,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        alert("sucessfully assigned promotors");
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        alert("succesfully assigned promotors");
        setRefresh(refresh + 1);
      });
  };

  return (
    <div>
      <h1>subjects without promotor: </h1>
      <div className="subject-container">
        <div className="grid-container">{subjectsWithoutPromotor}</div>
      </div>
    </div>
  );
};

export default AssignPromotors;
