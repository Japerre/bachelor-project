package com.bachproject.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
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
}
