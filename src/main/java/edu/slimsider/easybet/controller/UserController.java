package edu.slimsider.easybet.controller;

import edu.slimsider.easybet.exceptions.IllegalPersistanceException;
import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> create(@RequestBody User newUser) {
        if(newUser.getPassword().length() < 50) {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        }
        try {
            return ResponseEntity.ok(userService.createUser(newUser));
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalPersistanceException("This username is already in use " + newUser.getUsername());
        }
    }

   // @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/get_users")
    public ResponseEntity<Iterable<User>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/user/get_user_id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping("/user/get_user_name/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.getUser(username));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/delete_user/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER', 'PLAYER')")
    @PutMapping("/user/update_user")
    public ResponseEntity<User> update(@RequestBody User user) {
        try {
            if(user.getPassword().length() < 50) {
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            }
            if(userService.getUser(user.getId()) != null) {
                return ResponseEntity.ok(create(user).getBody());
            } else {
                return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().build().toUri()).body(create(user).getBody());
            }
        } catch (Exception e) {
            throw new IllegalPersistanceException("This username is already in use");
        }
    }
}
