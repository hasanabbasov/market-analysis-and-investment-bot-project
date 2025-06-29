package com.example.senior.service;

import com.example.senior.entity.BinanceEntity;
import com.example.senior.entity.PostEntity;
import com.example.senior.repository.BinanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BinanceService {

    @Autowired
    BinanceRepository binanceRepository;

//    public BinanceEntity updateBinanceInfo(Long userId , BinanceEntity data) {
//        Optional<BinanceEntity> postOptional = binanceRepository.findById(userId);
//        if (postOptional.isPresent()) {
//            BinanceEntity post = postOptional.get();
//            post.setApiKey(data.getApiKey());
//            post.setSecrutyKey(data.getSecrutyKey());
//            return binanceRepository.save(post);
//        }
//        return null;
//    }
    public void saveOrUpdate(BinanceEntity binanceEntity) {
        binanceRepository.save(binanceEntity);
    }

    @Transactional
    public BinanceEntity findByUserId(Long userId) {
        return binanceRepository.findByUserId(userId);
    }
}
