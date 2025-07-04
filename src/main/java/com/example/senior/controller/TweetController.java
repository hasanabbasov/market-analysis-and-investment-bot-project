package com.example.senior.controller;

import com.example.senior.dto.SocialMediaTweetDTO;
import com.example.senior.dto.UserOwnTweetForProfilePageDTO;
import com.example.senior.entity.TweetEntity;
import com.example.senior.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tweet")
public class TweetController {

    @Autowired
    TweetService tweetService;

    @PostMapping("/save")
    public List<TweetEntity> saveTweet(@RequestBody TweetEntity tweetEntity) {
        return tweetService.saveTweet(tweetEntity);
    }

    @GetMapping("/allTweet")
    public List<SocialMediaTweetDTO> getAllTweet(@RequestParam(name = "userId", required = false) Long userId) {
        return tweetService.allTweet(userId);
    }

    @GetMapping("/allTweet/{userId}")
    public List<UserOwnTweetForProfilePageDTO> getAllTweetWithId(@PathVariable("userId") Long userId) {
        return tweetService.allTweetWithId(userId);
    }

    @DeleteMapping("/delete/{tweetId}")
    public List<TweetEntity> deleteTweet(@PathVariable("tweetId") Long tweeId){
        return tweetService.deleteTweet(tweeId);
    }

    @PutMapping("/update/{tweetId}")
    public TweetEntity updateLikeCount(@PathVariable("tweetId") Long tweetId) {
        return tweetService.updateIncrementLikeCount(tweetId);
    }

}
