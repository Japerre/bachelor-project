package com.bachproject.demo.subject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {


    List<Subject> findByApprovedTrue();

    List<Subject> findByApprovedFalse();

    @Modifying
    @Transactional
    @Query("update Subject s set s.approved = true where s.subjectId = :id")
    void setApprovedTrue(@Param(value = "id") Long id);


    @Modifying
    @Transactional
    @Query("update Subject s set s.approved = false where s.subjectId = :id")
    void setApprovedFalse(@Param(value = "id") Long id);

    List<Subject> findByApprovedIsNull();
}
