package com.bachproject.demo.onderwerp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/subjects")
public class OnderwerpController {

    private final OnderwerpService onderwerpService;

    @Autowired
    public OnderwerpController(OnderwerpService onderwerpService){
        this.onderwerpService = onderwerpService;
    }

    @GetMapping
    @CrossOrigin(origins = "*")
    public List<Onderwerp> getOnderwerpen(){
        return onderwerpService.getOnderwerpen();
    }

    @PostMapping
    public void postNewOnderwerp(@RequestBody Onderwerp onderwerp){
        onderwerpService.addNewOnderwerp(onderwerp);
    }

}
