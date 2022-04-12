import Subject from "./Subject";

const Subjects = ({ subjects }) => {
  return (
    <>
      {subjects.map((subject) => (
        <Subject
          key={subject.id}
          subject={subject}
        />
      ))}
    </>
  );
};

export default Subjects;
