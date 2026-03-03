package org.uwa.service;

import org.springframework.stereotype.Service;
import org.uwa.model.ExerciseTemplate;
import org.uwa.model.dto.CreateExerciseTemplateRequest;
import org.uwa.repository.ExerciseTemplateRepository;

@Service
public class ExerciseTemplateService {

    private final ExerciseTemplateRepository repository;

    public ExerciseTemplateService(ExerciseTemplateRepository repository) {
        this.repository = repository;
    }

    public ExerciseTemplate create(String userId, CreateExerciseTemplateRequest req) {

        ExerciseTemplate template = new ExerciseTemplate();
        template.setName(req.name());
        template.setExpectedReps(req.expectedReps());
        template.setExpectedSets(req.expectedSets());
        template.setExpectedWeight(req.expectedWeight());
        template.setDescription(req.description());
        template.setUserId(userId);

        return repository.save(template);
    }
}

