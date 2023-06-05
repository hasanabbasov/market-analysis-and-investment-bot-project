package com.example.senior.service;

import com.example.senior.dto.CommentProfileDTO;
import com.example.senior.dto.SocialMediaTweetDTO;
import com.example.senior.dto.UserOwnPostForProfilePageDTO;
import com.example.senior.dto.UserOwnTweetForProfilePageDTO;
import com.example.senior.entity.*;
import com.example.senior.repository.CommentRepository;
import com.example.senior.repository.ProfileRepository;
import com.example.senior.repository.TweetRepository;
import com.example.senior.repository.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TweetService {

    @Autowired
    TweetRepository tweetRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    UserRepository usersRepository;


    public List<TweetEntity> saveTweet(TweetEntity tweetEntity) {
        Date date = new Date();
        long time = date.getTime();
        Timestamp timestamp = new Timestamp(time);
        tweetEntity.setDateTime(timestamp);
        tweetEntity.setLikes(1);
        tweetRepository.save(tweetEntity);
        return allTweetData();
    }

    public List<TweetEntity> allTweetData(){
        return tweetRepository.findAll();
    }

    @Transactional
    public List<SocialMediaTweetDTO> allTweet(Long currenUserId) {
        List<TweetEntity> tweets = tweetRepository.findAll();
        List<SocialMediaTweetDTO> tweetDTOs = new ArrayList<>();

        for (TweetEntity tweet : tweets) {
            SocialMediaTweetDTO tweetDTO = new SocialMediaTweetDTO();
            tweetDTO.setTweetId(tweet.getTweetId());
            tweetDTO.setUserId(tweet.getUserId());
            tweetDTO.setNick(tweet.getNick());
            tweetDTO.setLikes(tweet.getLikes());
            tweetDTO.setTweetText(tweet.getTweetText());
            tweetDTO.setDateTime(tweet.getDateTime());

            // get comments for the tweet
            List<CommentEntity> comments = commentRepository.findByTweetId(tweet.getTweetId());
            List<CommentProfileDTO> commentProfileDTOs = new ArrayList<>();
            for (CommentEntity comment : comments) {
                CommentProfileDTO commentProfileDTO = new CommentProfileDTO();
                commentProfileDTO.setCommentID(comment.getCommentID());
                commentProfileDTO.setPostId(comment.getPostId());
                commentProfileDTO.setTweetId(comment.getTweetId());
                commentProfileDTO.setUserId(comment.getUserId());
                commentProfileDTO.setComment(comment.getComment());
                commentProfileDTO.setNick(comment.getNick());
                commentProfileDTO.setDateTime(comment.getDateTime());

                // get profile for the user who commented
                Long userId = Long.parseLong(comment.getUserId());  // assuming userId is stored as a string in CommentEntity
                ProfileEntity profile = profileRepository.findById(userId).orElse(null);
                if (profile != null) {
                    commentProfileDTO.setProfileImageUrl(profile.getProfileImageUrl());
                    commentProfileDTO.setBackgroundImageUrl(profile.getBackgroundImageUrl());
                    commentProfileDTO.setEducation(profile.getEducation());
                    commentProfileDTO.setTwitter(profile.getTwitter());
                    commentProfileDTO.setFacebook(profile.getFacebook());
                    commentProfileDTO.setLive(profile.getLive());
                    commentProfileDTO.setInfo(profile.getInfo());
                }

                commentProfileDTOs.add(commentProfileDTO);
            }
            tweetDTO.setComments(commentProfileDTOs);

            // get profile for the user who tweeted
            ProfileEntity profile = profileRepository.findById(tweet.getUserId()).orElse(null);
            if (profile != null) {
                tweetDTO.setProfileImageUrl(profile.getProfileImageUrl());
                tweetDTO.setBackgroundImageUrl(profile.getBackgroundImageUrl());
                tweetDTO.setEducation(profile.getEducation());
                tweetDTO.setTwitter(profile.getTwitter());
                tweetDTO.setFacebook(profile.getFacebook());
                tweetDTO.setLive(profile.getLive());
                tweetDTO.setInfo(profile.getInfo());
            }

            UsersEntity loggedInUser = usersRepository.findById(currenUserId).orElse(null);
            if (loggedInUser != null) {
                Hibernate.initialize(loggedInUser.getFollowed());
                boolean isFollowingPoster = loggedInUser.getFollowed().stream()
                        .anyMatch(followedUser -> followedUser.getUserId().equals(tweet.getUserId()));
                tweetDTO.setFollowingPoster(isFollowingPoster);
            }

            tweetDTOs.add(tweetDTO);
        }

        return tweetDTOs;
    }




    public List<UserOwnTweetForProfilePageDTO> allTweetWithId(Long userId){

        List<TweetEntity> tweets = tweetRepository.findByUserId(userId);
        List<UserOwnTweetForProfilePageDTO> TweetDTOs = new ArrayList<>();

        for (TweetEntity tweet : tweets) {
            UserOwnTweetForProfilePageDTO TweetDTO = new UserOwnTweetForProfilePageDTO();
            TweetDTO.setPostId(tweet.getTweetId());
            TweetDTO.setUserId(tweet.getUserId());
            TweetDTO.setNick(tweet.getNick());
            TweetDTO.setTweetText(tweet.getTweetText());
            TweetDTO.setLikes(tweet.getLikes());
            TweetDTO.setDateTime(tweet.getDateTime());
            ProfileEntity profileEntity = profileRepository.findById(userId).orElse(null);
            TweetDTO.setProfileImageUrl(profileEntity.getProfileImageUrl());


            TweetDTOs.add(TweetDTO);
        }

        return TweetDTOs;

//        return tweetRepository.findByUserId(userId);
    }

    public List<TweetEntity> deleteTweet(Long tweeId) {
        tweetRepository.deleteById(tweeId);
        return allTweetData();
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
