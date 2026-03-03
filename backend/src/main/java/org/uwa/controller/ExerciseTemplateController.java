package org.uwa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwa.model.dto.CreateExerciseTemplateRequest;
import org.uwa.service.ExerciseTemplateService;

@RestController
@RequestMapping("/api/exercise/templates")
public class ExerciseTemplateController {

    private final ExerciseTemplateService service;

    public ExerciseTemplateController(ExerciseTemplateService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestHeader("X-USER-ID") String userId,
            @RequestBody CreateExerciseTemplateRequest request) {

        return ResponseEntity.ok(service.create(userId, request));
    }
}

