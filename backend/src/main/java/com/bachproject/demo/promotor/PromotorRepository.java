package com.bachproject.demo.promotor;

import com.bachproject.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotorRepository extends JpaRepository<Promotor, Long> {
    Promotor findByUser(User user);
}
