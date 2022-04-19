import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";

const AddSubject = () => {
  const [promotorList, setPromotorList] = useState([]);
  const [targetAudienceList, setTargetAudienceList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [employerType, setEmployerType] = useState("");
  const [researchGroupList, setResearchGroupList] = useState("");

  const [user, setUser] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:8080/whoami", {
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

  const fetchTopics = async () => {
    const data = await axios.get("http://localhost:8080/topics", {
      headers: { authorization: localStorage.getItem("token") },
    });
    setTopicList(
      data.data.map((topic) => ({
        label: topic.name,
        value: topic.topicId,
      }))
    );
  };

  const fetchResearchGroups = async () => {
    const data = await axios.get("http://localhost:8080/researchGroups", {
      headers: { authorization: localStorage.getItem("token") },
    });
    setResearchGroupList(
      data.data.map((group) => (
        <option key={group.researchGroupId} value={group.researchGroupId}>
          {group.name}
        </option>
      ))
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

    const subject = {
      title: data.title,
      description: data.description,
      amountOfStudents: data.amountOfStudents,

      targetAudienceList: data.targetAudiences.map((item) => ({
        targetAudienceId: item.value,
      })),

      promotorList: data.promotors.map((item) => ({
        promotorId: item.value,
      })),

      topicList: data.topics.map((item) => ({
        topicId: item.value,
      }))
    };

    console.log(subject);

    axios.post("http://localhost:8080/subjects/create", subject).then(
      (response) => {
        console.log(response);
        alert("subject posted");
      },
      (error) => {
        console.log(error);
        alert("Operation Failed");
      }
    );
  };

  const onMajorChange = (e) => {
    const majorCodeList = e.map((majorCode) =>
      majorCode.label.split("_")[0].slice(0, -1)
    );
    console.log(e);
    console.log(majorCodeList);
    setSelectedMajors(majorCodeList);
  };

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
          //rules={{required: true}}
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
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <Select
              placeholder="select target audience(s)"
              isMulti
              options={targetAudienceList}
              onFocus={fetchTargetAudienceList}
              {...field}
              //onChange={(e) => onMajorChange(e)} // this doesnt work
            />
          )}
        />
        {errors.targetAudiences && <p>select at least one target audience</p>}

        <label>topics</label>
        <Controller
          name="topics"
          rules={{ required: false }}
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

        {employerType === "researchGroup" && (
          <>
            <label>research group</label>
            <select onFocus={fetchResearchGroups} {...register}>
              {researchGroupList}
            </select>
            <button>submit</button>
          </>
        )}
      </form>
    </>
  );
};

export default AddSubject;
