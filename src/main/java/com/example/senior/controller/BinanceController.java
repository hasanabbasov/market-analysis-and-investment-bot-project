package com.example.senior.controller;

import com.example.senior.repository.BinanceRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/binance")
public class BinanceController {

    BinanceRepository binanceRepository;

    public BinanceController(BinanceRepository binanceRepository) {
        this.binanceRepository = binanceRepository;
    }

}
