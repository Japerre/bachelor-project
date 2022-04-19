package com.bachproject.demo.employer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employer {
    @Id
    @SequenceGenerator(
            name = "employer_sequence",
            sequenceName = "employer_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "employer_sequence"
    )
    private Long employerId;
    private String type;
}
