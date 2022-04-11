package com.bachproject.demo.student_subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentSubjectController {

    @Autowired
    StudentSubjectService studentSubjectService;

    @PostMapping(value = "/setPreference")
    public StudentSubject setPreference (@RequestBody StudentSubject studentSubject) {

        studentSubject = studentSubjectService.saveNewPreference(studentSubject);
        //System.out.println(studentSubject);
        return studentSubject;

        //return studentSubject;
    }

}
