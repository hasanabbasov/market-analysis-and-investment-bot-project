package com.example.senior.controller;

import com.example.senior.entity.BinanceEntity;
import com.example.senior.repository.BinanceRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/binance")
public class BinanceController {

    BinanceRepository binanceRepository;

    public BinanceController(BinanceRepository binanceRepository) {
        this.binanceRepository = binanceRepository;
    }

    @PostMapping("/sendData")
    public BinanceEntity saveData(@RequestBody BinanceEntity data) {
        return binanceRepository.save(data);
    }

    @GetMapping("/getData/{id}")
    public BinanceEntity getData(@PathVariable Long id) {
        return binanceRepository.findById(id).orElse(null);
    }

}
