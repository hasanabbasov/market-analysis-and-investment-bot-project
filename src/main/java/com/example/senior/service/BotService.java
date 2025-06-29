package com.example.senior.service;

import com.example.senior.entity.BotEntity;
import com.example.senior.repository.BotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BotService {


    @Autowired
    BotRepository botRepository;

    public List<BotEntity> getBotData(Long userId) {
        return botRepository.getAllByUserId(userId);
    }
}
