package org.config;

import org.model.Role;
import org.model.User;
import org.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements ApplicationRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void run(ApplicationArguments args) {
    if (userRepository.count() == 0) {
      userRepository.save(User.builder()
          .firstName("Jeff")
          .lastName("Smith")
          .username("Jeff")
          .email("jeff@example.com")
          .password(passwordEncoder.encode("password123"))
          .age(30)
          .role(Role.USER)
          .build());
    }
  }
}