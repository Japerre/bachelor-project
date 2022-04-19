package com.bachproject.demo.company;


import com.bachproject.demo.employer.Employer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company {
    @Id
    @SequenceGenerator(
            name = "company_sequence",
            sequenceName = "company_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "company_sequence"
    )
    private Long companyId;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "employer_id",
            referencedColumnName = "employerId"
    )
    private Employer employer; // overervering company is altijd een employer => optional = false

    String companyName;
    String website;
    String contactPersonFirstName;
    String contactPersonLastName;
    String contactPersonEmail;

}
