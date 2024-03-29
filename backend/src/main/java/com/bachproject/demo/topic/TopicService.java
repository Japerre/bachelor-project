package com.bachproject.demo.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    @Autowired
    TopicRepository topicRepository;

    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }
}
