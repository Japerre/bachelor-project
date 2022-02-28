package com.bachproject.demo.onderwerp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnderwerpRepository extends JpaRepository<Onderwerp, Long> {


}
