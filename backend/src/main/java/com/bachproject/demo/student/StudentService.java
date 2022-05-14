package com.bachproject.demo.student;

import com.bachproject.demo.subject.Subject;
import com.bachproject.demo.subject.SubjectRepository;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.targetAudience.TargetAudienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TargetAudienceRepository targetAudienceRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public Student registerStudent(Student student) {
        TargetAudience targetAudience = targetAudienceRepository.findByTargetAudienceId(student.getTargetAudience().getTargetAudienceId());
        student.setTargetAudience(targetAudience);
        student.getUser().setPassword(passwordEncoder.encode(student.getUser().getPassword()));
        return studentRepository.save(student);
    }

    public Student assignSubject(Long studentId, Subject subject) {
        Student student = studentRepository.getById(studentId);
        subject.setSubmitted(true);
        student.setAssignedSubject(subject);
        subjectRepository.save(subject);
        return studentRepository.save(student);
    }
}
