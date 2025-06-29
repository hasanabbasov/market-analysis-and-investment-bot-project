package com.example.senior.controller;

import com.example.senior.entity.BinanceEntity;
import com.example.senior.entity.PostEntity;
import com.example.senior.repository.BinanceRepository;
import com.example.senior.service.BinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/binance")
public class BinanceController {

    @Autowired
    BinanceRepository binanceRepository;

    @Autowired
    BinanceService binanceService;

    public BinanceController(BinanceRepository binanceRepository) {
        this.binanceRepository = binanceRepository;
    }

    @PostMapping("/sendData")
    public BinanceEntity saveData(@RequestBody BinanceEntity data) {
        return binanceRepository.save(data);
    }

    @GetMapping("/getData/{userId}")
    public BinanceEntity getDataByUserId(@PathVariable("userId") Long userId) {
        return binanceService.findByUserId(userId);
    }

    @PutMapping("/update")
    public void updateBinanceEntity(@RequestBody BinanceEntity binanceEntity) {
        binanceService.saveOrUpdate(binanceEntity);
    }

}
