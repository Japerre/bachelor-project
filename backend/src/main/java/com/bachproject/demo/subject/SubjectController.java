package com.bachproject.demo.subject;

import com.bachproject.demo.promotor.Promotor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService){
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subject> getSubjects(){
        return subjectService.getSubjects();
    }


    @GetMapping(value = "/approvedSubjects")
    public List<Subject> getApprovedSubjects(){
        return subjectService.getApprovedSubjects();
    }

    @GetMapping(path = "/{subjectId}")
    //@CrossOrigin(origins = "*")
    public Optional<Subject> getSubject(@PathVariable Long subjectId){
        return subjectService.getSubject(subjectId);
    }

    @PostMapping(path = "/create")
    //@CrossOrigin(origins = "*")
    public Subject createSubject(@RequestBody Subject subject){
        System.out.println(subject);
        return subjectService.addSubject(subject);
    }

    @GetMapping(value = "/subjectsToReview")
    public List<Subject> getSubjectsToReview() {
        return subjectService.getSubjectsToReview();
    }


    @GetMapping(value = "/disapprovedSubjects")
    public List<Subject> getDisapprovedSubjects() {
        return subjectService.getDisapprovedSubjects();
    }

    @PutMapping(value = "/approve/{subjectId}")
    public void approveSubject(@PathVariable Long subjectId) {
        subjectService.approveSubject(subjectId);
    }

    @PutMapping(value = "/disapprove/{subjectId}")
    public void disapproveSubject(@PathVariable Long subjectId){
        subjectService.disapproveSubject(subjectId);
    }


    @PutMapping(path = "/{subjectId}")
    //@CrossOrigin(origins = "*")
    public void addPromotor(@PathVariable Long subjectId, @RequestBody Promotor promotor){
        subjectService.addPromotor(subjectId, promotor);
    }

}
