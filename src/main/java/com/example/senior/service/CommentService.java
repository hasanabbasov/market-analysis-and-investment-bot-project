package com.example.senior.service;

import com.example.senior.entity.CommentEntity;
import com.example.senior.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepo;

    @Autowired
    UserService userService;

    public CommentEntity saveComment(CommentEntity comment) {
        Date date=new Date();
        long time=date.getTime();
        Timestamp dateTime=new Timestamp(time);

        comment.setDateTime(dateTime);
        return commentRepo.save(comment);
    }

    public List<CommentEntity> getAllComment(Long postID){
        List<CommentEntity> result=new ArrayList<>();
        result=commentRepo.findAllByOrderByCommentID();
        List<CommentEntity> filteredResult = result.stream()
                .filter(comment -> comment.getPostId() !=null && comment.getPostId().equals(postID))
                .collect(Collectors.toList());
        return filteredResult;
    }

    public List<CommentEntity> getAllCommentToTweet(Long tweetID) {
        List<CommentEntity> result=new ArrayList<>();
        result=commentRepo.findAllByOrderByCommentID();
        List<CommentEntity> filteredResult = result.stream()
                .filter(comment -> comment.getTweetId() !=null && comment.getTweetId().equals(tweetID))
                .collect(Collectors.toList());
        return filteredResult;
    }
}
