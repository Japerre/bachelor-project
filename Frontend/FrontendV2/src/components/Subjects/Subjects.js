import Subject from "./Subject";

const Subjects = ({ subjects, type, onFavorite, onCartClick, student }) => {
  return (
    <>
      {subjects.map((subject) => (
        <Subject
          key={subject.id}
          subjects={subjects}
          subject={subject}
          type={type}
          onFavorite={onFavorite}
          onCartClick={onCartClick}
          student={student}
        />
      ))}
    </>
  );
};

export default Subjects;
