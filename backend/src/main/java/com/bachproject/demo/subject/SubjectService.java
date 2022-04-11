package com.bachproject.demo.subject;

import com.bachproject.demo.promotor.Promotor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository){
        this.subjectRepository = subjectRepository;
    }

    public List<Subject> getOnderwerpen() {
        return subjectRepository.findAll();
    }

    public Optional<Subject> getOnderwerp(Long id){
        return subjectRepository.findById(id);
    }

    public void addNewOnderwerp(Subject onderwerp) {
        subjectRepository.save(onderwerp);
    }

    public void addPromotor(Long subjectId, Promotor promotor) {
        Subject subject = subjectRepository.getById(subjectId);
        subject.getPromotorList().add(promotor);
        subjectRepository.save(subject);
    }
}
