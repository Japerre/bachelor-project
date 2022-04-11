package com.bachproject.demo.campus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampusRepository extends JpaRepository<Campus, String> {
    Campus findByName(String name);
}
