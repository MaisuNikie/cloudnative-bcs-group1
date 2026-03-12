package org.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "exercise_instances")
@Getter
@Setter
public class ExerciseInstance {
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
