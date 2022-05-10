import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
const PromotorDetail = () => {

    const{
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();

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
    const location = useLocation()
    const promotor = location.state.promotor
    const employer = location.state.employer
    console.log(promotor)
    const sendEmail = (data) => {
        const entry = {
            //promotorEmail: promotor.user.userName,
            promotorEmail: "elian.vantomme@hotmail.be",
            studentEmail: student.user.userName,
            message: data.message,
            promotorName: promotor.user.firstName,
            studentName: student.user.firstName +" "+ student.user.lastName,
        }
        emailjs.init('WDJAJHpX9BdqcGo1D')
        emailjs.send('service_av1w41s', 'template_dy25uar', entry)
            .then((result) => {
                console.log("Gelukt" + result.text);
            }, (error) => {
                console.log("Error" + error.text);
            });
    }
    return(
      <>
          <div className={"promotor-grid-container"}>
              <div className="promotor-details-card">
                  <h2>Promotor name: {promotor.user.firstName + " " + promotor.user.lastName} </h2>
                  <h3>{promotor.user.userName}</h3>
                  <p>-- Research Group: {promotor.researchGroup.name}</p>
              </div>
              <div className="promotor-contact-form-card">
                  <h2>Contact the promotor</h2>
                  <div className="contact-promotor-form">
                      <form onSubmit={handleSubmit(sendEmail)}>
                          {/*<Controller*/}
                          {/*    shouldUnregister={true}*/}
                          {/*    name="emailSubject"*/}
                          {/*    rules={{required: false}}*/}
                          {/*    control={control}*/}
                          {/*    render={({field}) => (*/}
                          {/*        //TODO: Hier komt dan de onderwerpen uit de opleiding van de student met enkel de promotor*/}
                          {/*        <Select*/}
                          {/*            placeholder="Select a subject for the email"*/}
                          {/*            options={targetAudienceList}*/}
                          {/*            onFocus={fetchTargetAudienceList}*/}
                          {/*            {...field}*/}
                          {/*        />*/}
                          {/*  )}*/}
                          {/*/>*/}
                          <label>Message</label>
                          <textarea
                              rows="8"
                              {...register("message", {required: true})}
                          />
                          <button>submit</button>
                      </form>
                  </div>
              </div>
          </div>
      </>
  )
}
export default PromotorDetail