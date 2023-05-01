package com.example.senior.controller;

import com.example.senior.entity.CommentEntity;
import com.example.senior.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/save")
    public CommentEntity saveComment(@RequestBody CommentEntity comment) {
        return commentService.saveComment(comment);
    }

    @GetMapping("/getAllComments/{postID}")
    public List<CommentEntity> getAllComments(@PathVariable("postID") Long postID){
        return commentService.getAllComment(postID);

    }
}
