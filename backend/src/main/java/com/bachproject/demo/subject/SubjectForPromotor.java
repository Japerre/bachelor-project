package com.bachproject.demo.subject;

import com.bachproject.demo.student.Student;
import com.bachproject.demo.student.StudentForPromotor;
import com.bachproject.demo.student_subject.StudentSubject;
import com.bachproject.demo.targetAudience.TargetAudience;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SubjectForPromotor {

    private Subject subject;
    private List<StudentForPromotor> studentList;

    public SubjectForPromotor(StudentSubject studentSubject){
        subject = studentSubject.getSubject();
        studentList = new ArrayList<>();
        studentList.add(new StudentForPromotor(studentSubject));
    }

    public void addNewStudent(StudentSubject studentSubject){
        studentList.add(new StudentForPromotor(studentSubject));
    }
}
