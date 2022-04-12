import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const AddSubject = () => {
  const [promotorList, setPromotorList] = useState([]);
  const [targetAudienceList, setTargetAudienceList] = useState([]);
  const [topicList, setTopicList] = useState([]);

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

  const fetchTargetAudienceList = async () => {
    const data = await axios.get("http://localhost:8080/targetaudience");
    console.log(data);
    setTargetAudienceList(
      data.data.map((targetAudience) => ({
        label: targetAudience.majorCode + " " + targetAudience.campus.name,
        value: targetAudience.targetAudienceId,
      }))
    );
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>add a subject</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input type={"text"} {...register("title", { required: true })} />
        {errors.title && <p>title is required</p>}
        <label>Description</label>
        <textarea
          rows="4"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <p>discription is required</p>}
        <label>promotors</label>
        <Controller
          name="promotors"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="select promotor(s)"
              isMulti
              options={promotorList}
              onFocus={fetchPromotors}
              {...field}
            />
          )}
        />

        <label>target audiences</label>
        <Controller
          name="targetAudiences"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Select
              placeholder="select target audience(s)"
              isMulti
              options={targetAudienceList}
              onFocus={fetchTargetAudienceList}
              {...field}
            />
          )}
        />
        {errors.targetAudiences && <p>select at least one target audience</p>}

        <Controller 
          name="topics"
          rules={{required: true}}
          control={control}
          render={({ field }) => (
            <Select 
              placeholder="select topics"
              isMulti
              
              {...field}
            />
          )}
        />

        <label>amount of students</label>
        <input
          type="number"
          min={1}
          max={3}
          placeholder="1-3 students"
          {...register("amountOfStudents", { required: true, min: 1, max: 3 })}
        />
        {errors.amountOfStudents && <p>select 1, 2 or 3 students</p>}
        <button>submit</button>
      </form>
    </>
  );
};

export default AddSubject;
