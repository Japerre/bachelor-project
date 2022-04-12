package com.bachproject.demo.promotor;

import com.bachproject.demo.researchGroup.ResearchGroup;
import com.bachproject.demo.researchGroup.ResearchGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotorService {

    @Autowired
    PromotorRepository promotorRepository;

    @Autowired
    ResearchGroupRepository researchGroupRepository;

    public Promotor createNewPromotor(Promotor promotor) {
        //geen idee waarom getById een internal server error geeft en findById niet
        ResearchGroup researchGroup = researchGroupRepository.findById(promotor.getResearchGroup().getResearchGroupId()).get();
        System.out.println(researchGroup);
        promotor.setResearchGroup(researchGroup);
        return promotorRepository.save(promotor);
    }

    public List<Promotor> getPromotors() {
        return promotorRepository.findAll();
    }
}
