package com.bachproject.demo.promotor;

import com.bachproject.demo.onderwerp.Onderwerp;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
            mappedBy = "promotor"
    )
    //@JsonManagedReference
    private Onderwerp onderwerp;

    private String naam;
}
