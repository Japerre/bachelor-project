package com.bachproject.demo.opdrachtgever;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Opdrachtgever {
    @Id
    @SequenceGenerator(
            name = "opdrachtgever_sequence",
            sequenceName = "opdrachtgever_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "opdrachtgever_sequence"
    )
    private Long opdrachtgeverId;
    private int type;
}
