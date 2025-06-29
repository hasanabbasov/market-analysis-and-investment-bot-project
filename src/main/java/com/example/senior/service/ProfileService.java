package com.example.senior.service;

import com.example.senior.dto.UserContactDTO;
import com.example.senior.dto.UserProfileDto;
import com.example.senior.entity.ProfileEntity;
import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.ProfileRepository;
import com.example.senior.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    UserRepository userRepository;

    public ProfileEntity saveInfoById(Long userId, ProfileEntity data) {
        ProfileEntity profile = profileRepository.findById(userId)
                .orElse(new ProfileEntity());

        // Veri nesnesini güncelle
        if (data.getBackgroundImageUrl() != null) {
            profile.setBackgroundImageUrl(data.getBackgroundImageUrl());
        }
        if (data.getEducation() != null) {
            profile.setEducation(data.getEducation());
        }
        if (data.getFacebook() != null) {
            profile.setFacebook(data.getFacebook());
        }
        if (data.getInfo() != null) {
            profile.setInfo(data.getInfo());
        }
        if (data.getLive() != null) {
            profile.setLive(data.getLive());
        }
        if (data.getNick() != null) {
            profile.setNick(data.getNick());
        }
        if (data.getProfileImageUrl() != null) {
            profile.setProfileImageUrl(data.getProfileImageUrl());
        }
        if (data.getTwitter() != null) {
            profile.setTwitter(data.getTwitter());
        }
        // Profil nesnesini veritabanına kaydet
        return profileRepository.save(profile);
    }

    public UserProfileDto findUserProfileInfo(Long userId) {
        ProfileEntity profileEntity = profileRepository.findById(userId).orElseThrow();
        UsersEntity usersEntity = userRepository.findById(userId).orElseThrow();

        return UserProfileDto.builder()
                .userId(userId)
                .firstname(usersEntity.getFirstname())
                .lastname(usersEntity.getLastname())
                .email(usersEntity.getEmail())
                .nick(profileEntity.getNick())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .backgroundImageUrl(profileEntity.getBackgroundImageUrl())
                .education(profileEntity.getEducation())
                .twitter(profileEntity.getTwitter())
                .facebook(profileEntity.getFacebook())
                .live(profileEntity.getLive())
                .info(profileEntity.getInfo())
                .build();
    }

}
