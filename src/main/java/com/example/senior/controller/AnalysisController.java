package com.example.senior.controller;

import com.example.senior.entity.AnalysisEntity;
import com.example.senior.entity.BotEntity;
import com.example.senior.entity.CommentEntity;
import com.example.senior.repository.AnalysisRepository;
import com.example.senior.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    @Autowired
    AnalysisRepository analysisRepository;

    @Autowired
    AnalysisService analysisService;

    @PostMapping("/save")
    public AnalysisEntity saveAnalysisData(@RequestBody AnalysisEntity data) {
        return analysisRepository.save(data);
    }

    @GetMapping("/getAnalysis/{userId}")
    public List<AnalysisEntity> getAnalysisData(@PathVariable("userId") Long userId){
        return analysisService.getAnalysisData(userId);

    }

    @PostMapping("/stopBot/{userId}")
    public AnalysisEntity stopBot(@PathVariable("userId") Long userId, @RequestBody AnalysisEntity data) {
        return analysisService.stopBotMethod(userId, data);
    }

    @PostMapping("/update")
    public AnalysisEntity updateAnalysisData(@RequestBody AnalysisEntity data) {
        AnalysisEntity existingEntity = analysisRepository.findByUserId(data.getUserId());

        // Check if entity exists and any of the fields has changed
        if (existingEntity != null &&
                (!Objects.equals(existingEntity.getSymbol(), data.getSymbol())
                        || !Objects.equals(existingEntity.getInterval(), data.getInterval())
                        || existingEntity.isStart() != data.isStart())) {

            // If at least one field has changed, update the entity
            existingEntity.setSymbol(data.getSymbol());
            existingEntity.setInterval(data.getInterval());
            existingEntity.setStart(data.isStart());
            return analysisRepository.save(existingEntity);
        }

        // If no changes were detected or entity does not exist, return the original data without saving it
        return data;
    }

//    @PostMapping("/save")
//    public AnalysisEntity saveOrUpdateAnalysisData(@RequestBody AnalysisEntity data) {
//        AnalysisEntity existingEntity = analysisRepository.findByUserId(data.getUserId());
//
//        if(existingEntity != null) {
//            // Update existing entity fields
//            existingEntity.setSymbol(data.getSymbol());
//            existingEntity.setInterval(data.getInterval());
//            existingEntity.setStart(data.isStart());
//            return analysisRepository.save(existingEntity);
//        } else {
//            // Save new entity
//            return analysisRepository.save(data);
//        }
//    }

}
