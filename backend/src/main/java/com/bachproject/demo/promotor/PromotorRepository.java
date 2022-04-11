package com.bachproject.demo.promotor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotorRepository extends JpaRepository<Promotor, Long> {
}
