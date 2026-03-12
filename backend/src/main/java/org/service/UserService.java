package org.service;

import org.model.Role;
import org.model.User;
import org.model.dto.AuthenticationResponse;
import org.model.dto.UserInput;
import org.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager, JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  /**
   * Authenticates with a given username and password
   *
   * @param username the user's username
   * @param password the user's password (in plaintext)
   * @return an AuthenticationResponse containing a JWT
   */
  public AuthenticationResponse authenticate(String username, String password) {
    final var usernamePasswordAuthentication = new UsernamePasswordAuthenticationToken(username, password);
    final var authentication = authenticationManager.authenticate(usernamePasswordAuthentication);
    final var user = ((UserDetailsImpl) authentication.getPrincipal()).user();
    final var token = jwtService.generateToken(user);
    return new AuthenticationResponse(
        "Authentication successful.",
        token,
        user.getUsername(),
        user.getRole());
  }

  public User signup(Role role, UserInput userInput) {
    if (userRepository.existsByUsername(userInput.username())) {
      throw new IllegalArgumentException();
    }

    final var hashedPassword = passwordEncoder.encode(userInput.password());
    User user = User.builder()
        .firstName(userInput.firstName())
        .lastName(userInput.lastName())
        .username(userInput.username())
        .email(userInput.email())
        .password(hashedPassword)
        .age(userInput.age())
        .role(role)
        .build();

    return userRepository.save(user);
  }
}
