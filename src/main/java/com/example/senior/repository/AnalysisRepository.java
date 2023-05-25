package com.example.senior.repository;

import com.example.senior.entity.AnalysisEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalysisRepository  extends JpaRepository<AnalysisEntity, Long> {
    AnalysisEntity findByUserId(Long userId);

    List<AnalysisEntity> getAllByUserId(Long userId);
}
