package com.example.senior.service;

import com.example.senior.dto.UserContactDTO;
import com.example.senior.entity.ProfileEntity;
import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.ProfileRepository;
import com.example.senior.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    ProfileRepository profileRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UsersEntity getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public UsersEntity saveOneUser(UsersEntity newUser) {
        return userRepository.save(newUser);
    }

    @Transactional
    public void addFollowed(Long userId, Long followedId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        UsersEntity followed = userRepository.findById(followedId).orElseThrow();

        user.addFollowed(followed);
        userRepository.save(user);
    }
    @Transactional
    public void removeFollowed(Long userId, Long followedId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        UsersEntity followed = userRepository.findById(followedId).orElseThrow();

        user.removeFollowed(followed);
        userRepository.save(user);
    }

    @Transactional
    public List<UserContactDTO> getFollowing(Long userId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        List<UsersEntity> following = user.getFollowed().stream().collect(Collectors.toList());
        List<UserContactDTO> followingDTOList = new ArrayList<>();

        for(UsersEntity userEntity : following) {
            ProfileEntity profile = profileRepository.findById(userEntity.getUserId()).orElseThrow();
            UserContactDTO followingDTO = new UserContactDTO();

            followingDTO.setUserId(userEntity.getUserId());
            followingDTO.setUserName(userEntity.getUserName());
            followingDTO.setFirstname(userEntity.getFirstname());
            followingDTO.setLastname(userEntity.getLastname());
            followingDTO.setEmail(userEntity.getEmail());

            followingDTO.setNick(profile.getNick());
            followingDTO.setProfileImageUrl(profile.getProfileImageUrl());
            followingDTO.setBackgroundImageUrl(profile.getBackgroundImageUrl());
            followingDTO.setEducation(profile.getEducation());
            followingDTO.setTwitter(profile.getTwitter());
            followingDTO.setFacebook(profile.getFacebook());
            followingDTO.setLive(profile.getLive());
            followingDTO.setInfo(profile.getInfo());

            followingDTOList.add(followingDTO);
        }

        return followingDTOList;
    }


    @Transactional
    public List<UsersEntity> getFollowers(Long userId) {
        UsersEntity user = userRepository.findById(userId).orElseThrow();
        return user.getFollowers().stream().collect(Collectors.toList());
    }
}
