package com.example.senior.repository;

import com.example.senior.entity.PostEntity;
import com.example.senior.entity.TweetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {

    @Query("SELECT p FROM PostEntity p WHERE p.id = ?1")
    PostEntity findPostById(Long postId);

    List<PostEntity> findByUserId(Long userId);
}
