import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  let emailStudent = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@student.kuleuven.be/
  );
  let emailPromotor = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@promotor.kuleuven.be/
  );
  let emailError;

  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState("");
  const [targetAudienceId, setTargetAudienceId] = useState(0);
  const [researchGroupId, setResearchGroupId] = useState(0);
  const [targetAudienceList, setTargetAudienceList] = useState([]);
  const [researchGroupList, setResearchGroupList] = useState([]);

  const fetchTargetAudienceList = async () => {
    const data = await axios.get("http://localhost:8080/targetaudience");
    console.log(data);
    setTargetAudienceList(
      data.data.map((targetAudience) => ({
        label: targetAudience.majorCode + " _ " + targetAudience.campus.name,
        value: targetAudience.targetAudienceId,
      }))
    );
  };
  const fetchResearchGroup = async () => {
    const data = await axios.get(
      "http://localhost:8080/researchGroups/getResearchGroups"
    );
    console.log(data);
    setResearchGroupList(
      data.data.map((researchGroup) => ({
        label: researchGroup.name,
        value: researchGroup.researchGroupId,
      }))
    );
  };
  const fetchUsers = async () => {
    const data = await axios.get("http://localhost:8080/users");
    console.log(data.data);
    setUsers(
      data.data.map((user) => ({
        value: user.userName,
      }))
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate()

  const onSubmit = (data) => {
    if (role == "ROLE_STUDENT") {
      console.log(data);
      let student = {
        user: {
          userName: data.userName,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          role: "ROLE_STUDENT",
        },
        targetAudience: {
          targetAudienceId: data.targetAudienceId.value,
        },
      };

      axios.post("http://localhost:8080/students/register", student).then(
        (response) => {
          console.log(response);
          alert("User Added Successfully");
          navigate("/login")
        },
        (error) => {
          console.log(error);
          alert("Operation Failed");
        }
      );
    }

    if (role == "ROLE_PROMOTOR") {
      console.log(data.researchGroup);
      let promotor = {
        user: {
          userName: data.userName,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          role: "ROLE_PROMOTOR",
        },
        researchGroup: {
          researchGroupId: data.researchGroupId.value,
        },
      };
      axios.post("http://localhost:8080/promotors/register", promotor).then(
        (response) => {
          console.log(response);
          alert("User Added Successfully");
        },
        (error) => {
          console.log(error);
          alert("Operation Failed");
        }
      );
    }
  };

  return (
    <div className="form-container">
      <h1>register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="role">role</label>
        <select onChange={(e) => setRole(e.target.value)}>
          <option selected={"default"} disabled hidden>
            Select a role
          </option>
          <option value={"ROLE_STUDENT"}>Student</option>
          <option value={"ROLE_PROMOTOR"}>Promotor</option>
        </select>
        {errors.role && <p className={"errmsg"}>A role is required</p>}
        <label htmlFor="userName">email</label>

        <input
          type={"email"}
          {...register("userName", {
            validate: (userName) => {
              if (role == "ROLE_STUDENT") {
                if (!emailStudent.test(userName)) {
                  emailError = "Use a student email";
                  return "Use a student email";
                }
              }
              if (role == "ROLE_PROMOTOR") {
                if (!emailPromotor.test(userName)) {
                  console.log("Use a promotor email");
                  return "Use a promotor email";
                }
              }
              if (
                users.length > 0 &&
                typeof users.find((user) => user.value === userName) !==
                  "undefined"
              ) {
                console.log(userName);
                console.log("Username is already taken");
                return "Username is already taken";
              }
            },
          })}
        />
        {}
        {errors.userName && (
          <p className={"errmsg"}>
            {errors.userName.message}
          </p>
        )}

        <label htmlFor="password">Enter password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p className={"errmsg"}>Password is required</p>}

        <label htmlFor="password2">Confirm password</label>
        <input
          type="password"
          {...register("password2", {
            required: true,
            validate: (val) => {
              let checkPassword = watch("password");
              if (checkPassword !== val) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {console.log(errors)}
        {errors.password2 && <p className={"errmsg"}>Passwords do not match</p>}
        <label htmlFor="firstName">first name</label>
        <input type="text" {...register("firstName", { required: true })} />
        {errors.firstName && <p className={"errmsg"}>First name is required</p>}

        <label htmlFor="lname">last name</label>
        <input type="text" {...register("lastName", { required: true })} />
        {errors.lastName && <p className={"errmsg"}>Last name is required</p>}
        {role === "ROLE_STUDENT" && (
          <>
            <label htmlFor="targetaudience">target audience</label>
            <Controller
              shouldUnregister={true}
              name="targetAudienceId"
              rules={{ required: false }}
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select a target audience"
                  options={targetAudienceList}
                  onFocus={fetchTargetAudienceList}
                  {...field}
                />
              )}
            />
            <button style={{ cursor: "pointer" }}>submit</button>
          </>
        )}
        {role === "ROLE_PROMOTOR" && (
          <>
            <label htmlFor="researchGroup">Research Group</label>
            <Controller
              shouldUnregister={true}
              name="researchGroupId"
              rules={{ required: false }}
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select a research group"
                  options={researchGroupList}
                  onFocus={fetchResearchGroup}
                  {...field}
                />
              )}
            />
            <button style={{ cursor: "pointer" }}>submit</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
