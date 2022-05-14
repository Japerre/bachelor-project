import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Subjects from "../../components/Subjects/Subjects";

const BoostStudent = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((data) => {
        if (data.data.role != "ROLE_PROMOTOR") navigate("/");
        setUser(data.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const [subjectsForPromotor, setSubjectsForPromotor] = useState([])

  const fetchSubjectsForPromotor = async () => {
    const data = await axios.get(
      `http://localhost:8080/studentPreferences/getSubjectsForPromotor/1`,
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    console.log(data.data)
  };

  useState(()=>{
    fetchSubjectsForPromotor()
  },[user])

  return (
    <div className="subject-container">
      <div className="grid-container">
        <Subjects subjects={subjectsForPromotor} />
      </div>
    </div>
  );
};

export default BoostStudent;
