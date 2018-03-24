package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User newUser) {
        return userRepository.save(newUser);
    }

    public Iterable<User> getAll() {
        return userRepository.findAll();
    }

    public User deleteUser(long id) {
        User user = getUser(id);
        userRepository.delete(id);
        return user;
    }

    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    public User getUser(long id) {
        return this.userRepository.findById(id);
    }

    public User updateUser(long id, User user) {
        User userToUpdate = getUser(id);
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setBalance(user.getBalance());
        userToUpdate.setRole(user.getRole());
        return createUser(userToUpdate);
    }
}
