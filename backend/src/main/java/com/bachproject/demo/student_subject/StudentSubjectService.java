package com.bachproject.demo.student_subject;

import com.bachproject.demo.student.Student;
import com.bachproject.demo.student.StudentRepository;
import com.bachproject.demo.subject.Subject;
import com.bachproject.demo.subject.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentSubjectService {

    @Autowired
    StudentSubjectRepository studentSubjectRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    SubjectRepository subjectRepository;

    public StudentSubject saveNewPreference(StudentSubject studentSubject) {
        Optional<Student> student = studentRepository.findById(studentSubject.getStudent().getStudentId());
        Optional<Subject> subject = subjectRepository.findById(studentSubject.getSubject().getSubjectId());
        studentSubject.setStudent(student.get());
        studentSubject.setSubject(subject.get());
        //System.out.println(studentSubject);
        //System.out.println(studentSubjectRepository.save(studentSubject));
        return studentSubjectRepository.save(studentSubject);
    }

    public void setFavorite(Long subjectId, Long studentId) {
        StudentSubject studentSubject = studentSubjectRepository.findByStudentStudentIdAndSubjectSubjectId(subjectId, studentId);
        studentSubject.setFavorite(true);
        studentSubjectRepository.save(studentSubject);
    }

    public List<Subject> getFavoriteSubjects(Long studentId) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findAllByStudentStudentIdAndFavoriteTrue(studentId);
        List<Long> subjectIdList = studentSubjects.stream()
                .map(studentSubject -> studentSubject.getSubject().getSubjectId())
                .toList();
        List<Subject> subjectList = subjectRepository.findAllBySubjectIdIn(subjectIdList);
        return subjectList;
    }

    public List<StudentSubject> getSubjectsByStudentId(Long studentId) {
        return studentSubjectRepository.findAllByStudentStudentId(studentId);
    }
}
