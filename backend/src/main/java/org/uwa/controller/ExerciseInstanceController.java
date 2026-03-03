package org.uwa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwa.model.dto.CreateExerciseInstanceRequest;
import org.uwa.service.ExerciseInstanceService;

@RestController
@RequestMapping("/api/exercise/instances")
public class ExerciseInstanceController {

    private final ExerciseInstanceService service;

    public ExerciseInstanceController(ExerciseInstanceService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestHeader("X-USER-ID") String userId,
            @RequestBody CreateExerciseInstanceRequest request) {

        return ResponseEntity.ok(service.create(userId, request));
    }
}

