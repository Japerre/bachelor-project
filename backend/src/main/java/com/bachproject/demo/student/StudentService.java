package com.bachproject.demo.student;

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
}
