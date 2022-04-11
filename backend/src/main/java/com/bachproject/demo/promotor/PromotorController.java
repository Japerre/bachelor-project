package com.bachproject.demo.promotor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/promotors")
public class PromotorController {

    @Autowired
    PromotorService promotorService;

    @PostMapping
    public Promotor createNewPromotor(@RequestBody Promotor promotor){
        System.out.println(promotor);
        return promotorService.createNewPromotor(promotor);
    }

}
