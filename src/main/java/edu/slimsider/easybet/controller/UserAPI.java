package edu.slimsider.easybet.controller;

import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserAPI {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> create(@RequestBody User newUser) {
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        return ResponseEntity.ok(userService.createUser(newUser));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/get_users")
    public ResponseEntity<Iterable<User>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/user/get_user/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/delete_user/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/update_user/{id}")
    public ResponseEntity<User> update(@PathVariable("id") long id, @RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(userService.updateUser(id, user));
    }
}
