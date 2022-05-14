package com.bachproject.demo.student_subject;

import com.bachproject.demo.student.Student;
import com.bachproject.demo.subject.Subject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentSubject {

    @Id
    @SequenceGenerator(
            name = "student_subject_sequence",
            sequenceName = "student_subject_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_subject_sequence"
    )
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "STUDENT_ID")
    private Student student;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "SUBJECT_ID")
    private Subject subject;

    private int amountOfStars;
    private Boolean favorite;
    private Boolean inCart;
    private Boolean submitted;
    private Boolean boosted;

}
