package org.uwa.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {

    @NotBlank(message = "name may not be empty")
    String name;
    String password;
    @Id
    String email;

    @Min(value = 0, message = "age must be positive")
    @Max(value = 101, message = "age must not be over 101")
    int age;

    protected User(){};

    public User(String name, int age, String email, String password) {
        this.setName(name);
        this.setPassword(password);
        this.setEmail(email);
        this.setAge(age);
    }

    public void setName(String name) {
        if (name.replaceAll("\\s+","").isEmpty()) {
            throw new IllegalArgumentException("Name cannot be blank or have only spaces");
        } else {
            this.name = name;
        }
    }
    public void setPassword(String password) {
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        } else {
            this.password = password;
        }
    }
    public void setEmail(String email) {
        if (!email.contains("@") || !email.contains(".")) {
            throw new IllegalArgumentException("Not a valid email");
        }
        else {
            this.email = email;
        }
    }
    public void setAge(int age) {
        if (age < 0 || age > 101) {
            throw new IllegalArgumentException("Inappropriate age");
        } else {
            this.age = age;
        }
    }

    public String getName() {
        return name;
    }
    public String getPassword() {
        return password;
    }
    public String getEmail() {
        return email;
    }
    public int getAge() {
        return age;
    }

    public void updateNameAgePasswordForEmail(String email, String name, int age, String password){
        if (this.email.equals(email)) {
            setName(name);
            setAge(age);
            setPassword(password);
        }
        else throw new IllegalArgumentException("Email cannot be changed.");
    }
}
