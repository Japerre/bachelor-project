package com.bachproject.demo.student;

import com.bachproject.demo.student_subject.StudentSubject;
import com.bachproject.demo.targetAudience.TargetAudience;
import lombok.Data;

@Data
public class StudentForPromotor {
    private Long studentId;
    private String firstName;
    private String lastName;
    private TargetAudience targetAudience;
    private int amountOfStars;

    public StudentForPromotor(StudentSubject studentSubject){
        studentId = studentSubject.getStudent().getStudentId();
        firstName = studentSubject.getStudent().getUser().getFirstName();
        lastName = studentSubject.getStudent().getUser().getLastName();
        targetAudience = studentSubject.getStudent().getTargetAudience();
        amountOfStars = studentSubject.getAmountOfStars();
    }
}
