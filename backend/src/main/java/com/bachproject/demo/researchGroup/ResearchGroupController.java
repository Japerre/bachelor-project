package com.bachproject.demo.researchGroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/researchGroups")
public class ResearchGroupController {

    @Autowired
    ResearchGroupService researchGroupService;

    @PostMapping(value = "/create")
    public ResearchGroup createResearchGroup(@RequestBody ResearchGroup researchGroup){
        return researchGroupService.createResearchGroup(researchGroup);
    }

    @GetMapping(value = "/getResearchGroups")
    public List<ResearchGroup> getResearchGroups(){
        return researchGroupService.getResearchGroups();
    }

}
