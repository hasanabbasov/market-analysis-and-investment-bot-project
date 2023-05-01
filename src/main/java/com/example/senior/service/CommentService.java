package com.example.senior.service;

import com.example.senior.entity.CommentEntity;
import com.example.senior.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

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
        result=commentRepo.findAllById(Collections.singleton(postID));
        return result;
    }
}
