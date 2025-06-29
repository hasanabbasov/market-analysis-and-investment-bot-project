package com.example.senior.service;

import com.example.senior.entity.AnalysisEntity;
import com.example.senior.repository.AnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalysisService {

    @Autowired
    AnalysisRepository analysisRepository;

    public List<AnalysisEntity> getAnalysisData(Long userId) {
        return analysisRepository.getAllByUserId(userId);
    }

    public AnalysisEntity stopBotMethod(Long userId, AnalysisEntity data) {
        AnalysisEntity existingEntity = analysisRepository.findByUserId(userId);
        existingEntity.setSymbol("empty");
        existingEntity.setInterval("empty");
        existingEntity.setStart(false);
        return analysisRepository.save(existingEntity);
    }
}
