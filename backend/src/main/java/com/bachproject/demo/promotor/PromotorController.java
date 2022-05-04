package com.bachproject.demo.promotor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotors")
public class PromotorController {

    @Autowired
    PromotorService promotorService;

    @PostMapping("/register")
    public Promotor createNewPromotor(@RequestBody Promotor promotor){
        System.out.println(promotor);
        return promotorService.createNewPromotor(promotor);
    }

    @GetMapping
    public List<Promotor> getPromotors(){
        return promotorService.getPromotors();
    }

}
