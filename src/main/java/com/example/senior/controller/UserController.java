package com.example.senior.controller;

import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<UsersEntity> getAllUsers(){
        List<UsersEntity> getAllUsersList = userRepository.findAll();
        return getAllUsersList;
    }

    @GetMapping("/id")
    public UsersEntity getUserId(@PathVariable(value = "id") Integer userId){

        return userRepository.findById(userId).get();
    }

    @PostMapping("/register")
    public UsersEntity createUser(@RequestBody UsersEntity userEntity){
        return userRepository.save(userEntity);
    }

    @PostMapping("/login")
    public ResponseEntity<UsersEntity> login(@RequestBody UsersEntity user) {
        UsersEntity result = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if(result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
