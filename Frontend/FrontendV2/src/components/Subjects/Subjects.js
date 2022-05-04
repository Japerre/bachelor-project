import Subject from "./Subject";

const Subjects = ({ subjects, type }) => {
  return (
    <>
      {subjects.map((subject) => (
        <Subject
          key={subject.id}
          subject={subject}
          type={type}
        />
      ))}
    </>
  );
};

export default Subjects;
