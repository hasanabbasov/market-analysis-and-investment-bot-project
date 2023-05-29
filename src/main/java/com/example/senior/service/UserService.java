package com.example.senior.service;

import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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

    public void addFollowed(Long userId, Long followedId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        UsersEntity followed = userRepository.findById(followedId).orElseThrow();

        user.addFollowed(followed);
        userRepository.save(user);
    }

    public void removeFollowed(Long userId, Long followedId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        UsersEntity followed = userRepository.findById(followedId).orElseThrow();

        user.removeFollowed(followed);
        userRepository.save(user);
    }

    @Transactional
    public List<UsersEntity> getFollowing(Long userId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        return user.getFollowed().stream().collect(Collectors.toList());
    }

    @Transactional
    public List<UsersEntity> getFollowers(Long userId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        return user.getFollowers().stream().collect(Collectors.toList());
    }
}
