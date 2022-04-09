package com.bachproject.demo.student;

import com.bachproject.demo.onderwerp.Onderwerp;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
            optional = true
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

    //private List<Onderwerp> preferences;

}
