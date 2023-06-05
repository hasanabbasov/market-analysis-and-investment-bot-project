package com.example.senior.service;
import com.example.senior.dto.CommentProfileDTO;
import com.example.senior.dto.SocialMediaPostDTO;
import com.example.senior.dto.UserOwnPostForProfilePageDTO;
import com.example.senior.entity.CommentEntity;
import com.example.senior.entity.ProfileEntity;
import com.example.senior.repository.CommentRepository;
import com.example.senior.repository.ProfileRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.senior.entity.PostEntity;
import com.example.senior.entity.TweetEntity;
import com.example.senior.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ProfileRepository profileRepository;

    public List<PostEntity> savePost(PostEntity post) {
        Date date = new Date();
        long time = date.getTime();
        Timestamp timestamp = new Timestamp(time);
        post.setDateTime(timestamp);
        post.setLikes(1);
        postRepository.save(post);
        return allPostData();
    }

    public List<PostEntity> allPostData() {
        return postRepository.findAll();
    }

    public List<SocialMediaPostDTO> allPost() {
        List<PostEntity> posts = postRepository.findAll();
        List<SocialMediaPostDTO> postDTOs = new ArrayList<>();

        for (PostEntity post : posts) {
            SocialMediaPostDTO postDTO = new SocialMediaPostDTO();
            postDTO.setPostId(post.getPostId());
            postDTO.setUserId(post.getUserId());
            postDTO.setNick(post.getNick());
            postDTO.setImageUrl(post.getImageUrl());
            postDTO.setDescription(post.getDescription());
            postDTO.setPostImgUrl(post.getPostImgUrl());
            postDTO.setLikes(post.getLikes());
            postDTO.setDateTime(post.getDateTime());

            // get comments for the post
            List<CommentEntity> comments = commentRepository.findByPostId(post.getPostId());

            // convert CommentEntity to CommentProfileDTO
            List<CommentProfileDTO> commentProfileDTOS = new ArrayList<>();
            for (CommentEntity comment : comments) {
                CommentProfileDTO commentProfileDTO = new CommentProfileDTO();
                commentProfileDTO.setCommentID(comment.getCommentID());
                commentProfileDTO.setPostId(comment.getPostId());
                commentProfileDTO.setUserId(comment.getUserId());
                commentProfileDTO.setComment(comment.getComment());
                commentProfileDTO.setNick(comment.getNick());
                commentProfileDTO.setDateTime(comment.getDateTime());

                // get profile for the user who commented
                Long userId =  Long.parseLong(comment.getUserId());
                ProfileEntity profileEntity = profileRepository.findById(userId).orElse(null);
                if (profileEntity != null) {
                    commentProfileDTO.setProfileImageUrl(profileEntity.getProfileImageUrl());
                    commentProfileDTO.setBackgroundImageUrl(profileEntity.getBackgroundImageUrl());
                    commentProfileDTO.setEducation(profileEntity.getEducation());
                    commentProfileDTO.setTwitter(profileEntity.getTwitter());
                    commentProfileDTO.setFacebook(profileEntity.getFacebook());
                    commentProfileDTO.setLive(profileEntity.getLive());
                    commentProfileDTO.setInfo(profileEntity.getInfo());
                }

                commentProfileDTOS.add(commentProfileDTO);
            }
            postDTO.setComments(commentProfileDTOS);

            ProfileEntity profile = profileRepository.findById(post.getUserId()).orElse(null);
            if (profile != null) {
                postDTO.setProfileImageUrl(profile.getProfileImageUrl());
                postDTO.setBackgroundImageUrl(profile.getBackgroundImageUrl());
                postDTO.setEducation(profile.getEducation());
                postDTO.setTwitter(profile.getTwitter());
                postDTO.setFacebook(profile.getFacebook());
                postDTO.setLive(profile.getLive());
                postDTO.setInfo(profile.getInfo());
            }

            postDTOs.add(postDTO);
        }

        return postDTOs;
    }


    public List<PostEntity> deletePost(Long postId) {
        postRepository.deleteById(postId);
        return allPostData();
    }

    public PostEntity updateIncrementLikeCount(Long postId) {
        Optional<PostEntity> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            PostEntity post = postOptional.get();
            post.setLikes(post.getLikes() + 1);
            return postRepository.save(post);
        }
        return null;
    }

    @Transactional
    public List<UserOwnPostForProfilePageDTO> allPostWithId(Long userId) {
        List<PostEntity> posts = postRepository.findByUserId(userId);
        List<UserOwnPostForProfilePageDTO> postDTOs = new ArrayList<>();

        for (PostEntity post : posts) {
            UserOwnPostForProfilePageDTO postDTO = new UserOwnPostForProfilePageDTO();
            postDTO.setPostId(post.getPostId());
            postDTO.setUserId(post.getUserId());
            postDTO.setNick(post.getNick());
            postDTO.setImageUrl(post.getImageUrl());
            postDTO.setDescription(post.getDescription());
            postDTO.setPostImgUrl(post.getPostImgUrl());
            postDTO.setLikes(post.getLikes());
            postDTO.setProfileImageUrl(postDTO.getProfileImageUrl());
            postDTO.setDateTime(post.getDateTime());

            ProfileEntity profileEntity = profileRepository.findById(userId).orElse(null);
            postDTO.setProfileImageUrl(profileEntity.getProfileImageUrl());

            postDTOs.add(postDTO);
        }

        return postDTOs;
    }
}
