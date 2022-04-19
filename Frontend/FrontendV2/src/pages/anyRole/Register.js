import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import ValidateRegisterUser from "../../components/Register/ValidateRegisterUser";

const Register = () => {

  // const [targetAudienceList, setTargetAudienceList] = useState([]);
  // const [student, setStudent] = useState({
  //   user: {
  //     userName: '',
  //     password: '',
  //     password2: '',
  //     firstName: '',
  //     lastName: '',
  //     role: '',
  //   },targetAudience:{
  //     targetAudience: 0
  //   }
  // })
  // const { user, targetAudience } = student
  // const { targetAudienceId } = targetAudience
  // const { userName,password,password2,firstName,lastName,role } = user
  // const onInputChange = e => {
  //   setStudent({...student, [e.target.name]: e.target.value})
  // }
  const{
    register,
    handlesubmit,
    control,
      formState: {errors},
  } = useForm();

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
    ValidateRegisterUser(student)
    console.log(errors)
    addDataToServer(student)

  };


  const addDataToServer = (data) => {
    if (Object.keys(errors).length === 0){
      axios
          .post("http://localhost:8080/students/register", data)
          .then((response) => {
            console.log(response);
            alert("User Added Successfully")
          }, (error) => {
            console.log(error);
            alert("Operation Failed");
          });
    }
  }

  return (
    <div className="form-container">
      <h1>register</h1>
      <form onSubmit={e => registerStudent(e)}>
        <label htmlFor="role">role</label>
        <select name={"role"} id={"role"} defaultValue={"default"} required onChange={(e) => setRole(e.target.value)}>
          <option value={"default"} disabled hidden>--SELECT ROLE--</option>
          <option value={"ROLE_STUDENT"}>student</option>
          <option value={"ROLE_PROMOTOR"}>promotor</option>
        </select>
        {errors.role && <p>{errors.role}</p>}
        <label htmlFor="email">email</label>
        <input
            name={"userName"}
            type="email"
            id={"email"}
            onChange={(e) => setEmail(e.target.value)}
        />
        {errors.userName && <p>{errors.userName}</p>}
        <label htmlFor="password">Enter password</label>
        <input
            name={"password"}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}
        <label htmlFor="password2">Confirm password</label>
        <input
            name={"password2"}
            type="password"
            id="password2"
            onChange={(e) => setPassword2(e.target.value)}
        />
        {errors.password2 && <p>{errors.password2}</p>}
        <label htmlFor="firstName">first name</label>
        <input
            name={"firstName"}
            type="text"
            id="fname"
            onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label htmlFor="lname">last name</label>
        <input
            name={"lastName"}
            type="text"
            id="lname"
            onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
        {role === "ROLE_STUDENT" && (
          <>
            <label htmlFor="targetaudience">target audience</label>
            <select
                name={"targetAudienceId"}
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
            <button>register</button>
          </>
        )}

      </form>
    </div>
  );
};

export default Register;
