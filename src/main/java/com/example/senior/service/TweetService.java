package com.example.senior.service;

import com.example.senior.entity.PostEntity;
import com.example.senior.entity.TweetEntity;
import com.example.senior.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TweetService {

    @Autowired
    TweetRepository tweetRepository;
    public List<TweetEntity> saveTweet(TweetEntity tweetEntity) {
        Date date = new Date();
        long time = date.getTime();
        Timestamp timestamp = new Timestamp(time);
        tweetEntity.setDateTime(timestamp);
        tweetEntity.setLikes(1);
        tweetRepository.save(tweetEntity);
        return allTweet();
    }

    public List<TweetEntity> allTweet(){
        return tweetRepository.findAll();
    }

    public List<TweetEntity> deleteTweet(Long tweeId) {
        tweetRepository.deleteById(tweeId);
        return allTweet();
    }

    public TweetEntity updateIncrementLikeCount(Long tweetId) {
        Optional<TweetEntity> postOptional = tweetRepository.findById(tweetId);
        if (postOptional.isPresent()) {
            TweetEntity tweet = postOptional.get();
            tweet.setLikes(tweet.getLikes() + 1);
            return tweetRepository.save(tweet);
        }
        return null;
    }

}
