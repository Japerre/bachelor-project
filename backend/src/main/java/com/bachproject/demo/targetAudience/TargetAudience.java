package com.bachproject.demo.targetAudience;

import com.bachproject.demo.campus.Campus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TargetAudience {

    @Id
    @SequenceGenerator(
            name = "targetAudience_sequence",
            sequenceName = "targetAudience_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "targetAudience_sequence"
    )
    private Long targetAudienceId;

    // for example IW E-ICT-> industriele wetenschappen Elektronica ICT
    private String majorCode;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = true
    )
    @JoinColumn(
            name = "campus",
            referencedColumnName = "name"
    )
    private Campus campus;

}
