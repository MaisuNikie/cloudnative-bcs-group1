package org.uwa.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "exercise_instances")
@Data public class ExerciseInstance {
  @Id
  private String id;

  @Indexed
  private String userId;
  private String exerciseTemplateId;
  private Integer reps;
  private Integer sets;
  private Double weight;
  private Instant timestamp;
}
