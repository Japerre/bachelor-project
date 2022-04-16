package com.bachproject.demo.coordinator;

import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coordinator {

    @Id
    @SequenceGenerator(
            name = "coordinator_sequence",
            sequenceName = "coordinator_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "coordinator_sequence"
    )
    private Long coordinatorId;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "targetAudience_id",
            referencedColumnName = "targetAudienceId"
    )
    private TargetAudience targetAudience;

}
