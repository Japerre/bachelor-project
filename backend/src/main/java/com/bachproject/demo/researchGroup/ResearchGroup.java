package com.bachproject.demo.researchGroup;

import com.bachproject.demo.employer.Employer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResearchGroup {

    @Id
    @SequenceGenerator(
            name = "researchGroup_sequence",
            sequenceName = "researchGroup_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "researchGroup_sequence"
    )
    private Long researchGroupId;

    private String name;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = true
    )
    @JoinColumn(
            name = "employer_id",
            referencedColumnName = "employerId"
    )
    private Employer employer; // overervering researchGroup kan een employer zijn => optional = true

}
