package com.bachproject.demo.researchGroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResearchGroupService {

    @Autowired
    ResearchGroupRepository researchGroupRepository;

    public ResearchGroup createResearchGroup(ResearchGroup researchGroup) {
        return researchGroupRepository.save(researchGroup);
    }
}
