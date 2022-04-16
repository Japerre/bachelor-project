package com.bachproject.demo.promotor;

import com.bachproject.demo.researchGroup.ResearchGroup;
import com.bachproject.demo.researchGroup.ResearchGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotorService {

    @Autowired
    PromotorRepository promotorRepository;

    @Autowired
    ResearchGroupRepository researchGroupRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Promotor createNewPromotor(Promotor promotor) {
        //geen idee waarom getById een internal server error geeft en findById niet
        ResearchGroup researchGroup = researchGroupRepository.findById(promotor.getResearchGroup().getResearchGroupId()).get();
        promotor.setResearchGroup(researchGroup);
        promotor.getUser().setPassword(passwordEncoder.encode(promotor.getUser().getPassword()));
        return promotorRepository.save(promotor);
    }

    public List<Promotor> getPromotors() {
        return promotorRepository.findAll();
    }
}
