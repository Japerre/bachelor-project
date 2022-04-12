package com.bachproject.demo.researchGroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/researchGroups")
public class ResearchGroupController {

    @Autowired
    ResearchGroupService researchGroupService;

    @PostMapping(value = "/create")
    public ResearchGroup createResearchGroup(@RequestBody ResearchGroup researchGroup){
        return researchGroupService.createResearchGroup(researchGroup);
    }

}
