package com.bachproject.demo.subject;

import com.bachproject.demo.employer.Employer;
import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.topic.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectForStudent {
    private Subject subject;
    private boolean favorite;
}
