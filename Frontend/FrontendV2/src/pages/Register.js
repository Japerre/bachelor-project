import { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [targetAudienceId, setTargetAudienceId] = useState(0);

  const [targetAudienceList, setTargetAudienceList] = useState([]);

  useEffect(() => {
    const fetchTargetAudienceList = async () => {
      const data = await axios.get("http://localhost:8080/targetaudience");
      console.log(data.data);
      setTargetAudienceList(data.data);
    };

    fetchTargetAudienceList();
  }, []);

  const registerStudent = (e) => {
    e.preventDefault(); // zodat page niet refreshed (default is form submitten en refreshen)

    const student = {
      user: {
        userName: email,
        password: password,
        password2: password2,
        firstName: firstName,
        lastName: lastName,
        role: role,
      },
      targetAudience: {
        targetAudienceId: targetAudienceId,
      },
    };

    console.log(student);

    axios
      .post("http://localhost:8080/students/register", student)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <h1>register</h1>
      <form>
        <label htmlFor="role">role</label>
        <select name={"role"} id={"role"} defaultValue={"default"} required onChange={(e) => setRole(e.target.value)}>
          <option value={"deafult"} disabled hidden>--SELECT ROLE--</option>
          <option value={"ROLE_STUDENT"}>student</option>
          <option value={"ROLE_PROMOTOR"}>promotor</option>
        </select>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Enter password</label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password2">Confirm password</label>
        <input
            type="password"
            id="password2"
            required
            onChange={(e) => setPassword2(e.target.value)}
        />
        <label htmlFor="fname">first name</label>
        <input
          type="text"
          id="fname"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lname">last name</label>
        <input
          type="text"
          id="lname"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

        {role === "ROLE_STUDENT" && (
          <>
            <label htmlFor="targetaudience">target audience</label>
            <select
              required
              onChange={(e) => setTargetAudienceId(e.target.value)}
            >
            <option value="">-- SELECT TARGET AUDIENCE --</option>
              {targetAudienceList.map((targetAudience) => (
                <option
                  key={targetAudience.targetAudienceId}
                  value={targetAudience.targetAudienceId}
                >
                  {targetAudience.majorCode + " " + targetAudience.campus.name}
                </option>
              ))}
            </select>
            <button onClick={(e) => registerStudent(e)}>register</button>
          </>
        )}
      </form>
    </>
  );
};

export default Register;
