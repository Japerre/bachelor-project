import Subject from "./Subject";

const Subjects = ({ subjects, type, onFavorite }) => {
  return (
    <>
      {subjects.map((subject) => (
        <Subject
          key={subject.id}
          subject={subject}
          subjects={subjects}
          type={type}
          onFavorite={onFavorite}
        />
      ))}
    </>
  );
};

export default Subjects;
