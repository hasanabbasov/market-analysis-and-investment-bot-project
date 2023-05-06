package com.example.senior.service;

import com.example.senior.entity.PostEntity;
import com.example.senior.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    public List<PostEntity> savePost(PostEntity post) {
        Date date = new Date();
        long time = date.getTime();
        Timestamp timestamp = new Timestamp(time);
        post.setDateTime(timestamp);
        post.setLikes(1);
        postRepository.save(post);
        return allPost();
    }

    public List<PostEntity> allPost() {
        return postRepository.findAll();
    }

    public List<PostEntity> deletePost(Long postId) {
        postRepository.deleteById(postId);
        return allPost();
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
}
