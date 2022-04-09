package com.bachproject.demo.targetAudience;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TargetAudienceService {

    @Autowired
    private TargetAudienceRepository targetAudienceRepository;

    public List<TargetAudience> getTargetAudienceList() {
        return targetAudienceRepository.findAll();
    }

    public TargetAudience createNewTargetAudiecne(TargetAudience targetAudience) {
        return targetAudienceRepository.save(targetAudience);
    }

    public TargetAudience updateTargetAudience(TargetAudience targetAudience) {
        return targetAudienceRepository.save(targetAudience);
    }
}
