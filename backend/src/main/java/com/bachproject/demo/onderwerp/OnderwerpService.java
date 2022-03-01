package com.bachproject.demo.onderwerp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Onderwerp> getOnderwerp(Long id){
        return onderwerpRepository.findById(id);
    }

    public void addNewOnderwerp(Onderwerp onderwerp) {
        onderwerpRepository.save(onderwerp);
    }
}
