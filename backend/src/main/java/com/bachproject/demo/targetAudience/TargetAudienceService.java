package com.bachproject.demo.targetAudience;

import com.bachproject.demo.campus.Campus;
import com.bachproject.demo.campus.CampusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TargetAudienceService {

    @Autowired
    private TargetAudienceRepository targetAudienceRepository;

    @Autowired
    private CampusRepository campusRepository;

    public List<TargetAudience> getTargetAudienceList() {
        return targetAudienceRepository.findAll();
    }

    public TargetAudience createNewTargetAudiecne(TargetAudience targetAudience) {
        Campus campus = campusRepository.findByName(targetAudience.getCampus().getName());
        if(campus != null){
            targetAudience.setCampus(campus);
        }
        return targetAudienceRepository.save(targetAudience);
    }

    public TargetAudience updateTargetAudience(TargetAudience targetAudience) {
        return targetAudienceRepository.save(targetAudience);
    }
}
