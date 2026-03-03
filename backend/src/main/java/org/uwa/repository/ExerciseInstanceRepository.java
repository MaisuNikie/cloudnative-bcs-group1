package org.uwa.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.uwa.model.ExerciseInstance;

import java.util.List;

public interface ExerciseInstanceRepository extends MongoRepository<ExerciseInstance, String> {
    List<ExerciseInstance> findByUserId(String userId);

    List<ExerciseInstance> findByExerciseTemplateId(String templateId);
}
