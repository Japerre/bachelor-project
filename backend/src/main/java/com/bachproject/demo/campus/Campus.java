package com.bachproject.demo.campus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campus {

    @Id
    private String name;

    private String street;
    private String postalCode;
    private String streetNr;
}
