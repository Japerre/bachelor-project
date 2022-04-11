package com.bachproject.demo.targetAudience;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/targetaudience")
public class TargetAudienceController {

    @Autowired
    TargetAudienceService targetAudienceService;

    @GetMapping()
    public List<TargetAudience> getTargetAudienceList() {
        return targetAudienceService.getTargetAudienceList();
    }

    @PostMapping("/create")
    public TargetAudience createNewTargetAudience(@RequestBody TargetAudience targetAudience) {
        return targetAudienceService.createNewTargetAudiecne(targetAudience);
    }

    // werkt nog niet wou dit doen maar campus update dan niet correct
    @PutMapping("/update")
    public TargetAudience updateTargetAudience(@RequestBody TargetAudience targetAudience) {
        return targetAudienceService.updateTargetAudience(targetAudience);
    }

}
