package org.uwa.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;

    @NotBlank(message = "name may not be empty")
    String name;

    String password;
    String email;

    @Min(value = 0, message = "age must be positive")
    @Max(value = 101, message = "age must not be over 101")
    int age;

    private Role role;

    protected User() {}

    public User(String name, int age, String email, String password, Role role) {
        this.setName(name);
        this.setPassword(password);
        this.setEmail(email);
        this.setAge(age);
        this.role = role != null ? role : Role.USER;
    }

    public void setName(String name) {
        if (name == null || name.replaceAll("\\s+","").isEmpty()) {
            throw new IllegalArgumentException("Name cannot be blank or have only spaces");
        } else {
            this.name = name;
        }
    }

    public void setPassword(String password) {
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        } else {
            this.password = password;
        }
    }

    public void setEmail(String email) {
        if (email == null || !email.contains("@") || !email.contains(".")) {
            throw new IllegalArgumentException("Not a valid email");
        } else {
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

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public int getAge() {
        return age;
    }

    public Role getRole() {
        return role;
    }

    public void updateNameAgePasswordForEmail(String email, String name, int age, String password) {
        if (this.email.equals(email)) {
            setName(name);
            setAge(age);
            setPassword(password);
        } else {
            throw new IllegalArgumentException("Email cannot be changed.");
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}