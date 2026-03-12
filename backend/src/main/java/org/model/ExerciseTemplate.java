package org.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "exercise_templates")
@Getter
@Setter
public class ExerciseTemplate {
  @Id
  private String id;
  private String userId;
  private String name;
  private String description;
  private Integer expectedReps;
  private Integer expectedSets;
  private Double expectedWeight;
}
