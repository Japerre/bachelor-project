package com.bachproject.demo.researchGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchGroupRepository extends JpaRepository<ResearchGroup, Long> {
}
