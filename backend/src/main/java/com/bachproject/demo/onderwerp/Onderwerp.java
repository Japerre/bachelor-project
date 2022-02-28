package com.bachproject.demo.onderwerp;

import com.bachproject.demo.opdrachtgever.Opdrachtgever;
import com.bachproject.demo.promotor.Promotor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Onderwerp {

    @Id
    @SequenceGenerator(
            name = "onderwerp_sequence",
            sequenceName = "onderwerp_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "onderwerp_sequence"
    )
    private Long onderwerpId;
    private String titel;
    private String omschrijving;
    private int aantalStudenten;

    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "opdrachtgever_id",
            referencedColumnName = "opdrachtgeverId"
    )
    private Opdrachtgever opdrachtgever;


    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = true
    )
    @JoinColumn(
            name = "promotor_id",
            referencedColumnName = "promotorId"
    )
    //@JsonBackReference
    private Promotor promotor;
}
