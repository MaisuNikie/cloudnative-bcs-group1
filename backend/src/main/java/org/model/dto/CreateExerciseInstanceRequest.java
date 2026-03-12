package org.uwa.model.dto;

public record CreateExerciseInstanceRequest(
        String templateId,
        Integer reps,
        Integer sets,
        Double weight
) {
}
