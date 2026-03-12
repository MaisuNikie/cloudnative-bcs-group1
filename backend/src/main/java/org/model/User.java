package org.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class User {

    @Id
    private String id;

    @NotBlank(message = "Name cannot be blank or have only spaces")
    private String firstName;

    @NotBlank(message = "")
    private String lastName;

    @NotBlank(message = "")
    private String username;

    @Email
    private String email;

    private String password;

    @Min(value = 0, message = "age must be positive")
    @Max(value = 120, message = "age must not be over 120")
    private int age;

    @NotBlank
    private Role role;

    protected User() {}
}