package com.bachproject.demo.subject;

import com.bachproject.demo.company.Company;
import com.bachproject.demo.employer.Employer;
import com.bachproject.demo.promotor.Promotor;
import com.bachproject.demo.researchGroup.ResearchGroup;
import com.bachproject.demo.targetAudience.TargetAudience;
import com.bachproject.demo.topic.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectDTO {

    private Subject subject;

    //employer stuff
    private Employer employer;

    //company
    private Company company;

    //research group
    private ResearchGroup researchGroup;

}
