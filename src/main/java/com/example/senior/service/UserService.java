package com.example.senior.service;

import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UsersEntity getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public UsersEntity saveOneUser(UsersEntity newUser) {
        return userRepository.save(newUser);
    }
}
