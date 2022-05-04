package com.bachproject.demo.subject;

import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.student_subject.StudentSubject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(path = "/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService){
        this.subjectService = subjectService;
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
    public Subject createSubject(@RequestBody SubjectDTO subjectDTO) {
        System.out.println(subjectDTO);
        return subjectService.addSubject(subjectDTO);
    }

    @GetMapping(value = "/subjectsToReview")
    public List<Subject> getSubjectsToReview() {
        return subjectService.getSubjectsToReview();
    }

    @GetMapping(value = "/subjectsWithoutPromotor")
    public List<Subject> getSubjectsWithoutPromotor() {
        return subjectService.getSubjectsWithoutPromotor();
    }


    @GetMapping(value = "/disapprovedSubjects")
    public List<Subject> getDisapprovedSubjects() {
        return subjectService.getDisapprovedSubjects();
    }

    @GetMapping(value = "/getSubjectsByTargetAudience/{targetAudienceId}")
    public List<Subject> getSubjectsByTargetAudience(@PathVariable Long targetAudienceId){
        return subjectService.getSubjetsByTargetAudience(targetAudienceId);
    }

    @PutMapping(value = "/approve/{subjectId}")
    public void approveSubject(@PathVariable Long subjectId) {
        subjectService.approveSubject(subjectId);
    }

    @PutMapping(value = "/disapprove/{subjectId}")
    public void disapproveSubject(@PathVariable Long subjectId){
        subjectService.disapproveSubject(subjectId);
    }

    @PutMapping(path = "/assignPromotorsToSubject/{subjectId}")
    public Subject assignPromotorsToSubject(@PathVariable Long subjectId, @RequestBody List<Long> promotorIdList){
        return subjectService.assignPromotors(subjectId, promotorIdList);
    }

    @DeleteMapping(value = "/deleteSubject/{subjectId}")
    public void deleteSubject(@PathVariable Long subjectId){
        subjectService.deleteSubject(subjectId);
    }

    @GetMapping(value = "/getSubjectsForStudent/{studentId}")
    public List<SubjectForStudent> getSubjectsForStudent(@PathVariable Long studentId){
        return subjectService.getSubjectForStudent(studentId);
    }

}
