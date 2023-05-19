package com.example.senior.repository;

import com.example.senior.entity.TweetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<TweetEntity,Long> {
    List<TweetEntity> findAllByUserId(Long userId);
    List<TweetEntity> findByUserId(Long userId);
}
