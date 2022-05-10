package com.bachproject.demo.student_subject;

import com.bachproject.demo.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studentPreferences")
public class StudentSubjectController {

    @Autowired
    StudentSubjectService studentSubjectService;

    @GetMapping("/getSelectedSubjects")
    public List<StudentSubject> getSelectedSubjects(){
        return studentSubjectService.getSelectedSubjects();
    }

    @PostMapping(value = "/setPreference")
    public StudentSubject setPreference (@RequestBody StudentSubject studentSubject) {
        studentSubject = studentSubjectService.saveNewPreference(studentSubject);
        return studentSubject;
    }

    @PutMapping(value = "/toggleFavorite/{subjectId}/{studentId}")
    public void toggleFavorite(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId){
        studentSubjectService.toggleFavorite(subjectId, studentId);
    }

    @PutMapping(value = "/toggleInCart/{subjectId}/{studentId}")
    public void toggleInCart(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId) throws Exception {
        studentSubjectService.toggleInCart(subjectId, studentId);
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
