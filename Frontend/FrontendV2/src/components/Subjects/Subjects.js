import Subject from "./Subject";

const Subjects = ({ subjects, type, onFavorite }) => {
  return (
    <>
      {subjects.map((subject) => (
        <Subject
          key={subject.id}
          subjects={subjects}
          subject={subject}
          type={type}
          onFavorite={onFavorite}
        />
      ))}
    </>
  );
};

export default Subjects;
