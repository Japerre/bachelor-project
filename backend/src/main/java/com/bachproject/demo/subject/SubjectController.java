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
    //@CrossOrigin(origins = "*")
    public List<Subject> getSubjects(){
        return subjectService.getSubjects();
    }

    @GetMapping(path = "/{onderwerpId}")
    //@CrossOrigin(origins = "*")
    public Optional<Subject> getSubject(@PathVariable Long onderwerpId){
        return subjectService.getSubject(onderwerpId);
    }

    @PostMapping(path = "/create")
    //@CrossOrigin(origins = "*")
    public Subject createSubject(@RequestBody Subject subject){
        System.out.println(subject);
        return subjectService.addSubject(subject);
    }




    @PutMapping(path = "/{subjectId}")
    //@CrossOrigin(origins = "*")
    public void addPromotor(@PathVariable Long subjectId, @RequestBody Promotor promotor){
        subjectService.addPromotor(subjectId, promotor);
    }

}
