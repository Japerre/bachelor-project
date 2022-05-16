package com.bachproject.demo.student_subject;

import com.bachproject.demo.student.Student;
import com.bachproject.demo.subject.Subject;
import com.bachproject.demo.subject.SubjectForPromotor;
import com.bachproject.demo.subject.SubjectForStudent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studentPreferences")
public class StudentSubjectController {

    @Autowired
    StudentSubjectService studentSubjectService;

    // getmappings

    @GetMapping("/getSelectedSubjects")
    public List<StudentSubject> getSelectedSubjects(){
        return studentSubjectService.getSelectedSubjects();
    }

    @GetMapping(value ="/getSelectedSubjects/{subjectId}/{studentId}")
    public StudentSubject getSelectedSubject(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId){
        return studentSubjectService.getSelectedSubject(subjectId,studentId);
    }

    @GetMapping(value = "/getFavoriteSubjects/{studentId}")
    public List<Subject> getFavoriteSubjects(@PathVariable Long studentId){
        return studentSubjectService.getFavoriteSubjects(studentId);
    }

    @GetMapping(value = "/getSubjects/{studentId}")
    public List<StudentSubject> getSubjectsByStudentId(@PathVariable Long studentId){
        return studentSubjectService.getSubjectsByStudentId(studentId);
    }

    @GetMapping(value = "/getSubjectsInCart/{studentId}")
    public List<SubjectForStudent> getSubjectsInCart(@PathVariable Long studentId){
        return studentSubjectService.getSubjectsInCart(studentId);
    }

    @GetMapping(value = "/getSubjectsForPromotor/{promotorId}")
    public List<SubjectForPromotor> getSubjectsForPromotor(@PathVariable Long promotorId){
        return studentSubjectService.getSubjectsForPromotor(promotorId);
    }

    @GetMapping(value = "/getBoostedStudent/{subjectId}")
    public Student getBoostedStudent(@PathVariable("subjectId") Long subjectId){
        return studentSubjectService.getBoostedStudent(subjectId);
    }

    // postmappings

    @PostMapping(value = "/setPreference")
    public StudentSubject setPreference (@RequestBody StudentSubject studentSubject) {
        studentSubject = studentSubjectService.saveNewPreference(studentSubject);
        return studentSubject;
    }

    // putmappings

    @PutMapping(value = "/toggleFavorite/{subjectId}/{studentId}")
    public void toggleFavorite(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId){
        studentSubjectService.toggleFavorite(subjectId, studentId);
    }

    @PutMapping(value = "/toggleInCart/{subjectId}/{studentId}")
    public void toggleInCart(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId) throws Exception {
        studentSubjectService.toggleInCart(subjectId, studentId);
    }

    @PutMapping(value = "/setAmountOfStars/{subjectId}/{studentId}/{amtOfStars}")
    public void setAmountOfStars(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId, @PathVariable("amtOfStars") int amtOfStars){
        studentSubjectService.setAmountOfStars(subjectId, studentId, amtOfStars);
    }

    @PutMapping(value = "/submitSelection")
    public void submitSelection(@RequestBody List<Long> subjectIdList){
        studentSubjectService.submitSelection(subjectIdList);
    }

    @PutMapping(value = "/boostStudent/{subjectId}/{studentId}")
    public void boostStudent(@PathVariable("subjectId") Long subjectId, @PathVariable("studentId") Long studentId){
        studentSubjectService.boostStudent(subjectId,studentId);
    }
    @PutMapping(value = "/unboostStudent/{subjectId}")
    public void unboostStudent(@PathVariable("subjectId") Long subjectId) {
        studentSubjectService.unboostStudent(subjectId);
    }
}
