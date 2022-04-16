package com.bachproject.demo.coordinator;

import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.targetAudience.TargetAudienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CoordinatorService {

    @Autowired
    CoordinatorRepository coordinatorRepository;

    @Autowired
    TargetAudienceRepository targetAudienceRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Coordinator createCoordinator(Coordinator coordinator) {

        coordinator.setTargetAudience(targetAudienceRepository.findByTargetAudienceId(coordinator.getTargetAudience().getTargetAudienceId()));
        coordinator.getUser().setPassword(passwordEncoder.encode(coordinator.getUser().getPassword()));
        return coordinatorRepository.save(coordinator);
    }
}
