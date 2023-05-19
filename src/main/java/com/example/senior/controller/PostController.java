package com.example.senior.controller;

import com.example.senior.entity.PostEntity;
import com.example.senior.entity.TweetEntity;
import com.example.senior.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/save")
    public List<PostEntity> savePost(@RequestBody PostEntity post) {
        return postService.savePost(post);
    }

    @GetMapping("/getPost")
    public List<PostEntity> getAllPost() {
        return postService.allPost();
    }

    @GetMapping("/getPost/{userId}")
    public List<PostEntity> getAllTweetWithId(@PathVariable("userId") Long userId) {
        return postService.allPostWithId(userId);
    }

    @DeleteMapping("/delete/{postId}")
    public List<PostEntity> deletePost(@PathVariable("postId") Long postId) {
        return postService.deletePost(postId);
    }

    @PutMapping("/update/{postId}")
    public PostEntity updateLikeCount(@PathVariable("postId") Long postId) {
        return postService.updateIncrementLikeCount(postId);
    }

}
