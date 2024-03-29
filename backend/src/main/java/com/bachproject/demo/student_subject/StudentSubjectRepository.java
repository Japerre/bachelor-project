package com.bachproject.demo.student_subject;

import com.bachproject.demo.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSubjectRepository extends JpaRepository<StudentSubject, Long> {

    public StudentSubject findByStudentStudentIdAndSubjectSubjectId(Long studentId, Long subjectId);

    public List<StudentSubject> findAllByStudentStudentIdAndFavoriteTrue(Long studentId);
    public List<StudentSubject> findAllByStudentStudentIdAndFavoriteFalse(Long studentId);

    public List<StudentSubject> findAllByStudentStudentId(Long studentId);

    public Long countByStudentStudentIdAndInCartTrue(Long studentId);

    public List<StudentSubject> findAllByStudentStudentIdAndInCartTrue(Long studentId);

    public List<StudentSubject> findAllBySubjectSubjectIdIn(List<Long> subjectIdList);

    public List<StudentSubject> findAllBySubmittedTrue();

    public StudentSubject findBySubjectSubjectIdAndBoostedTrue(Long subjectId);


}
