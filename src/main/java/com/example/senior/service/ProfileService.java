package com.example.senior.service;

import com.example.senior.entity.ProfileEntity;
import com.example.senior.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

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
}
