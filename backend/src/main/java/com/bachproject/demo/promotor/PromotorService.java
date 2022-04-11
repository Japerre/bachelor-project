package com.bachproject.demo.promotor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromotorService {

    @Autowired
    PromotorRepository promotorRepository;

    public Promotor createNewPromotor(Promotor promotor) {
        return promotorRepository.save(promotor);
    }
}
