import React, { useState } from "react";
import axios from "axios";
import validationUser from "./validationUser";

function AddUser() {
    const [user, setUser] = useState({
        userName:'',
        role:'',
        password:'',
        password2:''
    });
    const [errors, setErrors] = useState({});

    const { userName, role, password, password2 } = user

    const onInputChange = e => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const FormHandle = e => {
        e.preventDefault();

        addDataToServer(user);
    }

    const addDataToServer = (data) => {

        if (Object.keys(errors).length === 0){
            axios.post("http://localhost:8080/api/v1/users", data).then(
                (response) => {
                    console.log(response);
                    alert("Subject Added Successfully");
                }, (error) => {
                    console.log(error);
                    alert("Operation failed");
                }
            )
        }
    }

    const validateInput = () => {
        setErrors(validationUser(user))
    }

    return(
        <main>
            <div className={"form-file"}>
                <form onSubmit={e => FormHandle(e)}>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Username</label>
                        <input type={"text"} name={"userName"} placeholder={"Enter username"} value={userName}
                               onChange={(e) => onInputChange(e)}/>
                        {errors.userName && <p>{errors.userName}</p>}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Role</label>
                        <select  name={"role"} defaultValue={"default"}
                               onChange={(e) => onInputChange(e)}>
                            <option value={"default"} disabled hidden>Choose a role</option>
                            <option value={"ROLE_USER"}>User</option>
                            <option value={"ROLE_ADMIN"}>Admin</option>
                        </select>
                        {errors.role && <p>{errors.role}</p>}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Password</label>
                        <input type={"password"} name={"password"} placeholder={"Enter password"} value={password}
                               onChange={(e) => onInputChange(e)}/>
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Confirm Password</label>
                        <input type={"password"} name={"password2"} placeholder={"Enter password"} value={password2}
                               onChange={(e) => onInputChange(e)}/>
                        {errors.password2 && <p>{errors.password2}</p>}
                    </div>
                    <div>
                        <button onClick={validateInput} type="submit">Add User</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
export default AddUser