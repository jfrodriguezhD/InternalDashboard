package com.engineering.dashboard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.engineering.dashboard.entities.UserEntity;
import com.engineering.dashboard.services.UserService;




@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("")
    public ResponseEntity<List<UserEntity>> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("")
    public ResponseEntity<UserEntity> postUser(@RequestBody UserEntity user) {
        return userService.createUser(user);
    }
    
    @GetMapping("/{usersId}")
    public ResponseEntity<UserEntity> getUser(@RequestParam Long usersId) {
        return userService.getUser(usersId);
    }

    @PutMapping("/{usersId}")
    public ResponseEntity<UserEntity> putUser(@PathVariable Long usersId, @RequestBody UserEntity user) {
        return userService.updateUser(usersId,user);
    }

    @DeleteMapping("/{usersId}")
    public ResponseEntity<UserEntity> deleteUser(@PathVariable Long usersId){
        return userService.deleteUser(usersId);
    }
}
