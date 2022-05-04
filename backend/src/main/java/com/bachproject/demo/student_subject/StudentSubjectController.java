package com.bachproject.demo.student_subject;

import com.bachproject.demo.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studentPreferences")
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

    @PutMapping(value = "/setFavorite/{subjectId}/{studentId}")
    public void setFavorite(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId){
        studentSubjectService.setFavorite(subjectId, studentId);
    }

    @GetMapping(value = "/getFavoriteSubjects/{studentId}")
    public List<Subject> getFavoriteSubjects(@PathVariable Long studentId){
        return studentSubjectService.getFavoriteSubjects(studentId);
    }

    @GetMapping(value = "/getSubjects/{studentId}")
    public List<StudentSubject> getSubjectsByStudentId(@PathVariable Long studentId){
        return studentSubjectService.getSubjectsByStudentId(studentId);
    }

}
