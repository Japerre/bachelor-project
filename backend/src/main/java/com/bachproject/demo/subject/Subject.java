package com.bachproject.demo.subject;

import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.student_subject.StudentSubject;
import com.bachproject.demo.topic.Topic;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private String titel;
    private String omschrijving;
    private int aantalStudenten;

    @ManyToMany(
            cascade = CascadeType.ALL
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
            cascade = CascadeType.ALL
    )
    @JoinTable(
            name = "subject_topic",
            joinColumns = @JoinColumn(
                    name = "subject_id",
                    referencedColumnName = "subjectId"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "topic",
                    referencedColumnName = "name"
            )
    )
    private List<Topic> topicList;

//    @ManyToOne(
//            cascade = CascadeType.ALL
//    )
//    @JoinColumn(
//            name = "opdrachtgever_id",
//            referencedColumnName = "opdrachtgeverId"
//    )
//    private Opdrachtgever opdrachtgever;


//    @OneToOne(
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY,
//            optional = true
//    )
//    @JoinColumn(
//            name = "promotor_id",
//            referencedColumnName = "promotorId"
//    )
//    @JsonBackReference
//    private Promotor promotor;

//    @OneToMany(mappedBy = "student")
//    private Set<StudentSubject> studentSubjectSet = new HashSet<StudentSubject>();
}
