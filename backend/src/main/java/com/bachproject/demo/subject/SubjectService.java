package com.bachproject.demo.subject;

import com.bachproject.demo.company.Company;
import com.bachproject.demo.company.CompanyRepository;
import com.bachproject.demo.employer.Employer;
import com.bachproject.demo.employer.EmployerRepository;
import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.promotor.PromotorRepository;
import com.bachproject.demo.researchGroup.ResearchGroup;
import com.bachproject.demo.researchGroup.ResearchGroupRepository;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.targetAudience.TargetAudienceRepository;
import com.bachproject.demo.topic.TopicRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
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
        System.out.println(targetAudience);
        List<Subject> subjectList = subjectRepository.findAll();
        List<Subject> temp = new ArrayList<>();
        for(Subject s : subjectList){
            if(s.getTargetAudienceList().contains(targetAudience) && s.getApproved()){
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
}
