package org.uwa.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.uwa.model.ExerciseTemplate;

import java.util.List;

public interface ExerciseTemplateRepository extends MongoRepository<ExerciseTemplate, String> {
    List<ExerciseTemplate> findByUserId(String userId);
}
