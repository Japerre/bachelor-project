package com.bachproject.demo.onderwerp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/subjects")
public class OnderwerpController {

    private final OnderwerpService onderwerpService;

    @Autowired
    public OnderwerpController(OnderwerpService onderwerpService){
        this.onderwerpService = onderwerpService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Onderwerp> getOnderwerpen(){
        return onderwerpService.getOnderwerpen();
    }

    @GetMapping(path = "/{onderwerpId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public Optional<Onderwerp> getOnderwerp(@PathVariable Long onderwerpId){
        return onderwerpService.getOnderwerp(onderwerpId);
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public void postNewOnderwerp(@RequestBody Onderwerp onderwerp){
        onderwerpService.addNewOnderwerp(onderwerp);
    }

}
