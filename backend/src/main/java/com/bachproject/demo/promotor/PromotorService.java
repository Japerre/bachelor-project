package com.bachproject.demo.promotor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotorService {

    @Autowired
    PromotorRepository promotorRepository;

    public Promotor createNewPromotor(Promotor promotor) {
        return promotorRepository.save(promotor);
    }

    public List<Promotor> getPromotors() {
        return promotorRepository.findAll();
    }
}
