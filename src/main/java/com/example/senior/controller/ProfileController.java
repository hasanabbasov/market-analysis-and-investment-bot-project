package com.example.senior.controller;

import com.example.senior.entity.BinanceEntity;
import com.example.senior.entity.ProfileEntity;
import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileRepository profileRepository;

    @GetMapping("/get/{userId}")
    public ProfileEntity getUserId(@PathVariable(value = "userId") Long userId){
        return profileRepository.findById(userId).get();
    }

    @PostMapping("/save")
    public ProfileEntity saveData(@RequestBody ProfileEntity data) {
        return profileRepository.save(data);
    }


}
