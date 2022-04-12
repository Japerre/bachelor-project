import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const AddSubject = () => {
  const [promotorList, setPromotorList] = useState([]);
  const [targetAudienceList, setTargetAudienceList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [employerType, setEmployerType] = useState("");
  const [researchGroupList, setResearchGroupList] = useState("")

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
        label: targetAudience.majorCode + " _ " + targetAudience.campus.name,
        value: targetAudience.targetAudienceId,
      }))
    );
  };

  const fetchTopics = async (majorCode) => {
    const data = await axios.get("http://localhost:8080/topics", {
      headers: { authorization: localStorage.getItem("token") },
    });
    console.log(data.data);
    setTopicList(
      data.data
        .filter((topic) => selectedMajors.includes(topic.majorCode))
        .map((topic) => ({
          label: topic.name,
          value: topic.name,
        }))
    );
  };

  const fetchResearchGroups = async () => {
    const data = await axios.get("http://localhost:8080/researchGroups", {
      headers: { authorization: localStorage.getItem("token") },
    });
    setResearchGroupList(data.data.map( (group) => (
      <option key={group.researchGroupId} value={group.researchGroupId}>{group.name}</option>
    ) ))
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onMajorChange = (e) => {
    const majorCodeList = e.map((majorCode) =>
      majorCode.label.split("_")[0].slice(0, -1)
    );
    console.log(e);
    console.log(majorCodeList);
    setSelectedMajors(majorCodeList);
  };


  const researchGroupForm = (
    <>
    <label>research group</label>
      <select onFocus={fetchResearchGroups}>
        {researchGroupList}
      </select>
      <button>submit</button>
    </>
  );


  return (
    <>
      <h1>subject</h1>
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
              onChange={(e) => onMajorChange(e)}
            />
          )}
        />
        {errors.targetAudiences && <p>select at least one target audience</p>}

        <label>topics</label>
        <Controller
          name="topics"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Select
              placeholder="select topics"
              isMulti
              options={topicList}
              onFocus={fetchTopics}
              {...field}
            />
          )}
        />
        {errors.topics && <p>select at least one topic</p>}

        <label>amount of students</label>
        <input
          type="number"
          min={1}
          max={3}
          placeholder="1-3 students"
          {...register("amountOfStudents", { required: true, min: 1, max: 3 })}
        />
        {errors.amountOfStudents && <p>select 1, 2 or 3 students</p>}

        <h1>employer</h1>
        <label>type of employer</label>
        <select
          defaultValue={"default"}
          onChange={(e) => setEmployerType(e.target.value)}
        >
          <option value="default" disabled hidden>
            -- SELECT TYPE OF EMPLOYER --
          </option>
          <option value="researchGroup">research group</option>
          <option value="company">company</option>
          <option value="student">student</option>
        </select>

        {employerType === "researchGroup" && researchGroupForm}
      </form>
    </>
  );
};



export default AddSubject;
