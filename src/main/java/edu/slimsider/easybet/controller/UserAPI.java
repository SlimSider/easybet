package edu.slimsider.easybet.controller;

import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserAPI {

    private UserService userService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserAPI(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<User> create(@RequestBody String username, @RequestBody String password) {
        User newUser = new User(username, bCryptPasswordEncoder.encode(password), 100);
        User user = userService.create(newUser);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

}
