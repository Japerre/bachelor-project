package com.bachproject.demo.student_subject;

import com.bachproject.demo.student.Student;
import com.bachproject.demo.student.StudentRepository;
import com.bachproject.demo.subject.Subject;
import com.bachproject.demo.subject.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
