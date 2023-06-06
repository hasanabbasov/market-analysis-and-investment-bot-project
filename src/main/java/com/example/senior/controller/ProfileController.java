package com.example.senior.controller;

import com.example.senior.dto.UserProfileDto;
import com.example.senior.entity.BinanceEntity;
import com.example.senior.entity.ProfileEntity;
import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.ProfileRepository;
import com.example.senior.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    ProfileService profileService;

    @GetMapping("/get/{userId}")
    public UserProfileDto getUserId(@PathVariable(value = "userId") Long userId){
        return profileService.findUserProfileInfo(userId);
//        return profileRepository.findById(userId).get();
    }

    @GetMapping("/getAll")
    public List<ProfileEntity> getAll(){
        return profileRepository.findAll();
    }

    @PostMapping("/save/{userId}")
    public ProfileEntity saveData(@PathVariable(value = "userId") Long userId, @RequestBody ProfileEntity data) {
        return profileService.saveInfoById(userId,data);
    }


}
