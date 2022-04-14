package com.bachproject.demo.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public List<Topic> getTopics(){
         return topicService.getTopics();
    }

    @PostMapping(value = "/create")
    public Topic createTopic(@RequestBody Topic topic){
        return topicService.createTopic(topic);
    }

}
