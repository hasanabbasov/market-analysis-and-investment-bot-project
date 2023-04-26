package com.example.senior.controller;

import com.example.senior.entity.PostEntity;
import com.example.senior.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/save")
    public List<PostEntity> savePost(@RequestBody PostEntity post) {
        List<PostEntity> result = postService.savePost(post);
        return result;
    }

    @GetMapping("/getPost")
    public List<PostEntity> getAllPost() {
        List<PostEntity> result = postService.allPost();
        return result;
    }

    @DeleteMapping("/delete/{postId}")
    public List<PostEntity> deletePost(@PathVariable("postId") Long postId) {
        List<PostEntity> result = postService.deletePost(postId);
        return result;
    }

}
