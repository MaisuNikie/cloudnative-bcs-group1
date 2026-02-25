package org.uwa.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.uwa.model.User;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {

    List<User> findByName(String username);
    User findByEmail(String email);

}