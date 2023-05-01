package com.example.senior.service;

import com.example.senior.entity.PostEntity;
import com.example.senior.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

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
}
