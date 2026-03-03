package org.uwa.service;

import org.springframework.stereotype.Service;
import org.uwa.model.ExerciseInstance;
import org.uwa.model.dto.CreateExerciseInstanceRequest;
import org.uwa.repository.ExerciseInstanceRepository;

import java.time.Instant;

@Service
public class ExerciseInstanceService {

    private final ExerciseInstanceRepository repository;

    public ExerciseInstanceService(ExerciseInstanceRepository repository) {
        this.repository = repository;
    }

    public ExerciseInstance create(String userId, CreateExerciseInstanceRequest req) {

        ExerciseInstance instance = new ExerciseInstance();
        instance.setExerciseTemplateId(req.templateId());
        instance.setReps(req.reps());
        instance.setSets(req.sets());
        instance.setWeight(req.weight());
        instance.setTimestamp(Instant.now());
        instance.setUserId(userId);

        return repository.save(instance);
    }
}

