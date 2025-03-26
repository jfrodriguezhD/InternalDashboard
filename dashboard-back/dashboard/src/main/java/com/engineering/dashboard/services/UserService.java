package com.engineering.dashboard.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.engineering.dashboard.entities.UserEntity;
import com.engineering.dashboard.repositories.UserRepository;

import jakarta.validation.Valid;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    public ResponseEntity<UserEntity> createUser(@Valid @RequestBody UserEntity user) {
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    public ResponseEntity<UserEntity> getUser(Long id) {
        Optional<UserEntity> user = userRepository.findById(id);

        if (user.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(user.get());
    }

    public ResponseEntity<UserEntity> updateUser(Long usersId,@Valid @RequestBody UserEntity user) {
        
        Optional<UserEntity> oldUser = userRepository.findById(usersId);
        
        if(oldUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        user.setId(usersId);
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    public ResponseEntity<UserEntity> deleteUser(Long userId) {
        
        Optional<UserEntity> user = userRepository.findById(userId);
        
        if(user.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        userRepository.delete(user.get());
        return ResponseEntity.status(HttpStatus.OK).body(user.get());
    }

}
