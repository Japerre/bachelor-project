package com.bachproject.demo.subject;

import com.bachproject.demo.company.Company;
import com.bachproject.demo.company.CompanyRepository;
import com.bachproject.demo.employer.Employer;
import com.bachproject.demo.employer.EmployerRepository;
import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.promotor.PromotorRepository;
import com.bachproject.demo.researchGroup.ResearchGroup;
import com.bachproject.demo.researchGroup.ResearchGroupRepository;
import com.bachproject.demo.student.Student;
import com.bachproject.demo.student.StudentRepository;
import com.bachproject.demo.student_subject.StudentSubject;
import com.bachproject.demo.student_subject.StudentSubjectRepository;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.targetAudience.TargetAudienceRepository;
import com.bachproject.demo.topic.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TargetAudienceRepository targetAudienceRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private PromotorRepository promotorRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private ResearchGroupRepository researchGroupRepository;

    @Autowired
    private StudentSubjectRepository studentSubjectRepository;

    @Autowired
    private StudentRepository studentRepository;


    public Optional<Subject> getSubject(Long id) {
        return subjectRepository.findById(id);
    }

    public Subject addSubject(SubjectDTO subjectDTO) {
        Subject subject = subjectDTO.getSubject();

        subject.setTargetAudienceList(targetAudienceRepository.findAllById(subject.getTargetAudienceList().stream()
                .map(targetAudience -> targetAudience.getTargetAudienceId())
                .collect(Collectors.toList())));


        subject.setPromotorList(promotorRepository.findAllById(subject.getPromotorList().stream()
                .map(promotor -> promotor.getPromotorId())
                .collect(Collectors.toList())));


        subject.setTopicList(topicRepository.findAllById(subject.getTopicList().stream()
                .map(topic -> topic.getTopicId())
                .collect(Collectors.toList())));

        Employer employer = employerRepository.save(subjectDTO.getEmployer());
        subject.setEmployer(employer);

        if(subjectDTO.getEmployer().getType().equals("company")){
            Company company = subjectDTO.getCompany();
            company.setEmployer(employer);
            companyRepository.save(company);
        }

        if(subjectDTO.getEmployer().getType().equals("researchGroup")){
            ResearchGroup researchGroup = researchGroupRepository.getById(subjectDTO.getResearchGroup().getResearchGroupId());
            researchGroup.setEmployer(employer);
            researchGroupRepository.save(researchGroup);
        }

        return subjectRepository.save(subject);
    }



    public void addPromotor(Long subjectId, Promotor promotor) {
        Subject subject = subjectRepository.getById(subjectId);
        subject.getPromotorList().add(promotor);
        subjectRepository.save(subject);
    }

    public List<Subject> getApprovedSubjects() {
        return subjectRepository.findByApprovedTrue();
    }

    public List<Subject> getDisapprovedSubjects() {
        return subjectRepository.findByApprovedFalse();
    }

    public void approveSubject(Long subjectId) {
        subjectRepository.setApprovedTrue(subjectId);
    }

    public void disapproveSubject(Long subjectId) {
        subjectRepository.setApprovedFalse(subjectId);
    }

    public List<Subject> getSubjectsToReview() {
        return subjectRepository.findByApprovedIsNull();
    }

    public List<Subject> getSubjetsByTargetAudience(Long targetAudienceId) {
        TargetAudience targetAudience = targetAudienceRepository.findByTargetAudienceId(targetAudienceId);
        List<Subject> subjectList = subjectRepository.findAll();
        System.out.println(subjectList.size());
        List<Subject> temp = new ArrayList<>();
        for(Subject s : subjectList){
            if(s.getApproved() != null && s.getTargetAudienceList().contains(targetAudience) && s.getApproved()){
                temp.add(s);
            }
        }
        return temp;
    }


    public List<Subject> getSubjectsWithoutPromotor() {
        List<Subject> subjectList = subjectRepository.findAll();
        List<Subject> subjectsWithoutPromotor = new ArrayList<>();
        for (Subject s : subjectList){
            if(s.getPromotorList().isEmpty()){
                subjectsWithoutPromotor.add(s);
            }
        }
        return subjectsWithoutPromotor;
    }

    public Subject assignPromotors(Long subjectId, List<Long> promotorIdList) {
        Subject subject = subjectRepository.getById(subjectId);
        List<Promotor> promotorList = new ArrayList<>();
        for(Long id : promotorIdList){
            promotorList.add(promotorRepository.getById(id));
        }
        subject.setPromotorList(promotorList);
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long subjectId) {
        subjectRepository.deleteById(subjectId);
    }

    public List<SubjectForStudent> getSubjectForStudent(Long studentId) {
        //favorites in the join table StudentSubject
        List<StudentSubject> favorites = studentSubjectRepository.findAllByStudentStudentIdAndFavoriteTrue(studentId);
        //not favorites in the join table StudentSubject
        List<StudentSubject> notFavorites = studentSubjectRepository.findAllByStudentStudentIdAndFavoriteFalse(studentId);

        List<Long> subjectIdInJoinTableList = new ArrayList<>();
        List<SubjectForStudent> subjects = new ArrayList<>();
        for(StudentSubject s : favorites){
            subjects.add(new SubjectForStudent(s));
            subjectIdInJoinTableList.add(s.getSubject().getSubjectId());
        }
        for(StudentSubject s : notFavorites){
            subjects.add(new SubjectForStudent(s));
            subjectIdInJoinTableList.add(s.getSubject().getSubjectId());
        }

        //subjects not in the join table and with the right target audience
        List<Subject> notInJoinTable = getSubjetsByTargetAudience(studentRepository.getById(studentId).getTargetAudience().getTargetAudienceId())
                .stream()
                .filter(subject -> !subjectIdInJoinTableList.contains(subject.getSubjectId()))
                .toList();
        for(Subject s : notInJoinTable){
            Student student = studentRepository.getById(studentId);
            StudentSubject studentSubject = new StudentSubject();
            studentSubject.setStudent(student);
            studentSubject.setSubject(s);
            studentSubject.setFavorite(false);
            studentSubject.setInCart(false);
            studentSubjectRepository.save(studentSubject);
            subjects.add(new SubjectForStudent(studentSubject));
        }
        return subjects;
    }


    public List<SubjectForStudent> getFavoriteSubjects(Long studentId) {
        List<StudentSubject> subjectsInCart = studentSubjectRepository.findAllByStudentStudentIdAndFavoriteTrue(studentId);
        List<SubjectForStudent> subjectForStudentList = subjectsInCart.stream()
                .map(studentSubject -> new SubjectForStudent(studentSubject))
                .toList();
        return subjectForStudentList;
    }
}
