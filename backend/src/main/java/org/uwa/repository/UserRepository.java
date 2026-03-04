package org.uwa.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.uwa.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByName(String username);
    User findByEmail(String email);

}