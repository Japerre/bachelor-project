package com.bachproject.demo.promotor;

import com.bachproject.demo.researchGroup.ResearchGroup;
import com.bachproject.demo.subject.Subject;
import com.bachproject.demo.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Promotor {
    @Id
    @SequenceGenerator(
            name = "promotor_sequence",
            sequenceName = "promotor_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "promotor_sequence"
    )
    private Long promotorId;

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


    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "researchGroup_id", referencedColumnName = "researchGroupId")
    private ResearchGroup researchGroup;



}
