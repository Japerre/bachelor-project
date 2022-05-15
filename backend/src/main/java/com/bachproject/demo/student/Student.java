package com.bachproject.demo.student;

import com.bachproject.demo.student_subject.StudentSubject;
import com.bachproject.demo.subject.Subject;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.rmi.StubNotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long studentId;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = true
    )
    @JoinColumn(
            name = "target_audience",
            referencedColumnName = "TargetAudienceId"
    )

    private TargetAudience targetAudience;

    @ManyToOne()
    @JoinColumn(
            name ="subject_id",
            referencedColumnName = "subjectId"
    )
    private Subject assignedSubject;
}
