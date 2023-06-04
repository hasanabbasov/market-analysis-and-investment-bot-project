package com.example.senior.repository;

import com.example.senior.entity.CommentEntity;
import com.example.senior.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    List<CommentEntity> findAllByOrderByCommentID();

    List<CommentEntity> findByPostId(Long postId);

    List<CommentEntity> findByTweetId(Long tweetId);

//    List<CommentEntity> findAllById(Long postId);

//    List<CommentEntity> findAllById(Long postID);
}
