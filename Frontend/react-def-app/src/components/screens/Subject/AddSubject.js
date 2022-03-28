import React, { useState } from 'react'
import axios from 'axios';
import validationUser from "../Users/validationUser";

function AddSubject() {
    const [subject, setSubject] = useState({
        aantalStudenten: '',
        omschrijving: '',
        titel: '',
        opdrachtgever: '',
        promotor:''
    });

    const { aantalStudenten, omschrijving, titel ,opdrachtgever,
        promotor} = subject

    const onInputChange = e => {
        setSubject({...subject, [e.target.name]:e.target.value})
    }

    const FormHandle = e => {
        e.preventDefault();
        addDataToServer(subject);
    }
    const addDataToServer = (data) => {
        axios.post("http://localhost:8080/api/v1/subjects",data).then(
            (response)=>{
                console.log(response);
                alert("Subject Added Successfully");
            }, (error) => {
                console.log(error);
                alert("Operation failed");
            }
        )
    }
    return(
        <main>
            <div className={"form-file"}>
                <form onSubmit={e => FormHandle(e)}>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Subject Title</label>
                        <input type={"text"} name={"titel"} placeholder={"Enter Title"} value={titel}
                               onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Subject Description</label>
                        <textarea name={"omschrijving"} placeholder={"Enter Description"} value={omschrijving}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Subject Employee</label>
                        <input  type={"number"} name={"opdrachtgever"} placeholder={"Enter Employee"} value={opdrachtgever}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Subject Promotor</label>
                        <input type={"number"} name={"promotor"} placeholder={"Enter Promotor"} value={promotor}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"exampleInputTitle"}>Subject Amount of Students</label>
                        <input type={"number"} min={1} max={2} name={"aantalStudenten"} placeholder={"Enter Amount of students"} value={aantalStudenten}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div>
                        <button type="submit">Add Subject</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
export default AddSubject
