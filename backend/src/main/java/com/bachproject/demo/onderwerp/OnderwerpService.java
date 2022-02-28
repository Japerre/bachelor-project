package com.bachproject.demo.onderwerp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OnderwerpService {

    private final OnderwerpRepository onderwerpRepository;

    @Autowired
    public OnderwerpService(OnderwerpRepository onderwerpRepository){
        this.onderwerpRepository = onderwerpRepository;
    }

    public List<Onderwerp> getOnderwerpen() {
        return onderwerpRepository.findAll();
    }

    public void addNewOnderwerp(Onderwerp onderwerp) {
        onderwerpRepository.save(onderwerp);
    }
}
