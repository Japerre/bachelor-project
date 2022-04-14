package com.bachproject.demo.subject;

import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.promotor.PromotorRepository;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.targetAudience.TargetAudienceRepository;
import com.bachproject.demo.topic.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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


    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

    public Optional<Subject> getSubject(Long id) {
        return subjectRepository.findById(id);
    }

    public Subject addSubject(Subject subject) {

        subject.setTargetAudienceList(targetAudienceRepository.findAllById(subject.getTargetAudienceList().stream()
                .map(targetAudience -> targetAudience.getTargetAudienceId())
                .collect(Collectors.toList())));


        subject.setPromotorList(promotorRepository.findAllById(subject.getPromotorList().stream()
                .map(promotor -> promotor.getPromotorId())
                .collect(Collectors.toList())));


        subject.setTopicList(topicRepository.findAllById(subject.getTopicList().stream()
                .map(topic -> topic.getTopicId())
                .collect(Collectors.toList())));

        return subjectRepository.save(subject);
        //return subject; // dit gebruiken als we het willen zien maar neit opslaan
    }

    public void addPromotor(Long subjectId, Promotor promotor) {
        Subject subject = subjectRepository.getById(subjectId);
        subject.getPromotorList().add(promotor);
        subjectRepository.save(subject);
    }
}
