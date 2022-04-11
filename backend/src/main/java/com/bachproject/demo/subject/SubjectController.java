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
    public List<Subject> getOnderwerpen(){
        return subjectService.getOnderwerpen();
    }

    @GetMapping(path = "/{onderwerpId}")
    //@CrossOrigin(origins = "*")
    public Optional<Subject> getOnderwerp(@PathVariable Long onderwerpId){
        return subjectService.getOnderwerp(onderwerpId);
    }

    @PostMapping
    //@CrossOrigin(origins = "*")
    public void postNewOnderwerp(@RequestBody Subject onderwerp){
        subjectService.addNewOnderwerp(onderwerp);
    }

    @PutMapping(path = "/{subjectId}")
    //@CrossOrigin(origins = "*")
    public void addPromotor(@PathVariable Long subjectId, @RequestBody Promotor promotor){
        subjectService.addPromotor(subjectId, promotor);
    }

}
