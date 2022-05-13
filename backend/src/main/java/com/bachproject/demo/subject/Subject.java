package com.bachproject.demo.subject;

import com.bachproject.demo.employer.Employer;
import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.topic.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Controller;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subject {

    @Id
    @SequenceGenerator(
            name = "subject_sequence",
            sequenceName = "subject_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "subject_sequence"
    )
    private Long subjectId;
    private String title;
    private String description;
    private int amountOfStudents;

    @ManyToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "subject_promotor",
            joinColumns = @JoinColumn(
                    name = "subject_id",
                    referencedColumnName = "subjectId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "promotor_id",
                    referencedColumnName = "promotorId"
            )
    )
    private List<Promotor> promotorList;


    @ManyToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "subject_topic",
            joinColumns = @JoinColumn(
                    name = "subject_id",
                    referencedColumnName = "subjectId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "topic_id",
                    referencedColumnName = "topicId"
            )
    )
    private List<Topic> topicList;


    @ManyToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "subject_targetAudience",
            joinColumns = @JoinColumn(
                    name = "subject_id",
                    referencedColumnName = "subjectId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "targetAudience_id",
                    referencedColumnName = "targetAudienceId"
            )
    )
    private List<TargetAudience> targetAudienceList;

    private Boolean approved;
    private Boolean submitted;

    @ManyToOne()
    @JoinColumn(name="employer_id", referencedColumnName = "employerId")
    private Employer employer;
}
