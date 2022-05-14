package com.bachproject.demo.student_subject;

import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.student.Student;
import com.bachproject.demo.student.StudentRepository;
import com.bachproject.demo.subject.Subject;
import com.bachproject.demo.subject.SubjectForPromotor;
import com.bachproject.demo.subject.SubjectForStudent;
import com.bachproject.demo.subject.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentSubjectService {

    @Autowired
    StudentSubjectRepository studentSubjectRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    SubjectRepository subjectRepository;

    public StudentSubject saveNewPreference(StudentSubject studentSubject) {
        Optional<Student> student = studentRepository.findById(studentSubject.getStudent().getStudentId());
        Optional<Subject> subject = subjectRepository.findById(studentSubject.getSubject().getSubjectId());
        studentSubject.setStudent(student.get());
        studentSubject.setSubject(subject.get());
        //System.out.println(studentSubject);
        //System.out.println(studentSubjectRepository.save(studentSubject));
        return studentSubjectRepository.save(studentSubject);
    }

    public void toggleFavorite(Long subjectId, Long studentId) {
        StudentSubject studentSubject = studentSubjectRepository.findByStudentStudentIdAndSubjectSubjectId(studentId, subjectId);
        if (studentSubject != null) {
            //if we defavorite a subject it can not stay in your cart
            if (studentSubject.getFavorite()) {
                studentSubject.setInCart(false);
                studentSubject.setAmountOfStars(0);
            }
            studentSubject.setFavorite(!studentSubject.getFavorite());
        } else {
            Subject subject = subjectRepository.getById(subjectId);
            Student student = studentRepository.getById(studentId);
            studentSubject = new StudentSubject();
            studentSubject.setSubject(subject);
            studentSubject.setStudent(student);
            studentSubject.setFavorite(true);
            studentSubject.setInCart(false);
            studentSubject.setSubmitted(false);
        }
        studentSubjectRepository.save(studentSubject);
    }

    public void toggleInCart(Long subjectId, Long studentId) throws Exception {
        StudentSubject studentSubject = studentSubjectRepository.findByStudentStudentIdAndSubjectSubjectId(studentId, subjectId);
        System.out.println("studentSubject = " + studentSubject);
        Long amountInCart = studentSubjectRepository.countByStudentStudentIdAndInCartTrue(studentId);
        System.out.println("amountInCart = " + amountInCart);
        if (studentSubject != null) {
            //we can always put less than 3 in the cart
            if (studentSubject.getInCart()) {
                studentSubject.setInCart(!studentSubject.getInCart());
                studentSubject.setAmountOfStars(0);
            } else if (amountInCart < 3) {
                studentSubject.setInCart(!studentSubject.getInCart());
            } else throw new Exception("you can't have more than 3 subjects in your cart");
            studentSubjectRepository.save(studentSubject);
        }
    }

    public List<Subject> getFavoriteSubjects(Long studentId) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findAllByStudentStudentIdAndFavoriteTrue(studentId);
        List<Long> subjectIdList = studentSubjects.stream()
                .map(studentSubject -> studentSubject.getSubject().getSubjectId())
                .toList();
        List<Subject> subjectList = subjectRepository.findAllBySubjectIdIn(subjectIdList);
        return subjectList;
    }

    public List<StudentSubject> getSubjectsByStudentId(Long studentId) {
        return studentSubjectRepository.findAllByStudentStudentId(studentId);
    }

    public List<StudentSubject> getSelectedSubjects() {
        return studentSubjectRepository.findAll();
    }


    public List<SubjectForStudent> getSubjectsInCart(Long studentId) {
        return studentSubjectRepository.findAllByStudentStudentIdAndInCartTrue(studentId).stream()
                .map(studentSubject -> new SubjectForStudent(studentSubject))
                .toList();
    }

    public void setAmountOfStars(Long subjectId, Long studentId, int amtOfStars) {
        StudentSubject studentSubject = studentSubjectRepository.findByStudentStudentIdAndSubjectSubjectId(studentId, subjectId);
        studentSubject.setAmountOfStars(amtOfStars);
        studentSubjectRepository.save(studentSubject);
    }

    public void submitSelection(List<Long> subjectIdList) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findAllBySubjectSubjectIdIn(subjectIdList);
        for (StudentSubject s : studentSubjects) {
            s.setSubmitted(true);
            studentSubjectRepository.save(s);
        }
    }

    public List<SubjectForPromotor> getSubjectsForPromotor(Long promotorId) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findAllBySubmittedTrue();
        List<StudentSubject> filteredStudentSubjects = new ArrayList<>();
        for (StudentSubject studentSubject : studentSubjects) {
            List<Promotor> promotorList = studentSubject.getSubject().getPromotorList();
            for (Promotor p : promotorList) {
                if (p.getPromotorId() == promotorId) {
                    filteredStudentSubjects.add(studentSubject);
                }
            }
        }

        //converting studentsubjects into subjects we can return to be used in boost for promotors
        List<SubjectForPromotor> subjectForPromotorList = new ArrayList<>();
        for (StudentSubject studentSubject : filteredStudentSubjects) {
            Optional<SubjectForPromotor> optional = subjectForPromotorList.stream()
                    .filter(subjectForPromotor -> subjectForPromotor.getSubject().getSubjectId() == studentSubject.getSubject().getSubjectId())
                    .findFirst();

            optional.ifPresentOrElse(subjectForPromotor -> subjectForPromotor.addNewStudent(studentSubject),
                    () -> subjectForPromotorList.add(new SubjectForPromotor(studentSubject)));

        }
        return subjectForPromotorList;
    }

    public void boostStudent(Long subjectId, Long studentId) {
        StudentSubject studentSubject = studentSubjectRepository.findByStudentStudentIdAndSubjectSubjectId(studentId, subjectId);
        Subject subject = subjectRepository.getById(subjectId);
        studentSubject.setBoosted(true);
        subject.setBoosted(true);
        studentSubjectRepository.save(studentSubject);
        subjectRepository.save(subject);
    }

    public StudentSubject getSelectedSubject(Long subjectId, Long studentId) {
        return studentSubjectRepository.findByStudentStudentIdAndSubjectSubjectId(studentId, subjectId);
    }
}
