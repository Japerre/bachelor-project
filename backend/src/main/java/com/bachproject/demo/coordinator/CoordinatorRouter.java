package com.bachproject.demo.coordinator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/coordinator")
public class CoordinatorRouter {

    @Autowired
    CoordinatorService coordinatorService;

    @PostMapping(value = "/create")
    public Coordinator createCoordinator(@RequestBody Coordinator coordinator){
        return coordinatorService.createCoordinator(coordinator);
    }

}
