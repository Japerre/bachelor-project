import Subject from "./Subject";

const Subjects = ({ subjects, type, onFavorite, onCartClick, student, refreshParent }) => {
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
          refreshParent={refreshParent}
        />
      ))}
    </>
  );
};

export default Subjects;
