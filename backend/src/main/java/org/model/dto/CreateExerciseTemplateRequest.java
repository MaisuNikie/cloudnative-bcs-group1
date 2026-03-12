package org.uwa.model.dto;

public record CreateExerciseTemplateRequest(
        String name,
        String description,
        Integer expectedReps,
        Integer expectedSets,
        Double expectedWeight
) {
}
