package com.bachproject.demo.student;

import com.bachproject.demo.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    //@CrossOrigin(origins = "*")
    public List<Student> getStudents(){
        return studentService.getStudents();
    }

    @PostMapping("/register")
    //@CrossOrigin(origins = "*")
    public Student registerStudent(@RequestBody Student student) {
        return studentService.registerStudent(student);
    }

    @PutMapping(path ="/assignedSubject/{studentId}")
    public Student assignSubject(@PathVariable Long studentId, @RequestBody Subject subject){
        return studentService.assignSubject(studentId, subject);
    }
    @PutMapping(path="/eraseAssignment/{assignedStudentId}/{subjectId}")
    public void eraseAssignedSubject(@PathVariable("assignedStudentId") Long assignedStudentId, @PathVariable("subjectId") Long subjectId){
        studentService.eraseAssignedSubject(assignedStudentId,subjectId);
    }
}
