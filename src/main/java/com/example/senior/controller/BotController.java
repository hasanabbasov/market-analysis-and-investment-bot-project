package com.example.senior.controller;

import com.example.senior.entity.BinanceEntity;
import com.example.senior.entity.BotEntity;
import com.example.senior.repository.BotRepository;
import com.example.senior.service.BotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bot")
public class BotController {

    @Autowired
    BotService botService;

    @Autowired
    BotRepository botRepository;

    @PostMapping("/save")
    public BotEntity saveBotData(@RequestBody BotEntity data) {
        return botRepository.save(data);
    }


    @GetMapping("/getBot")
    public List<BotEntity> getBotData() {
        return botService.getBotData();
    }

    @PutMapping("/update/{id}")
    public BotEntity updateBotEntity(@PathVariable Long id) {
        Optional<BotEntity> botEntityOptional = botRepository.findById(id);
        if (botEntityOptional.isPresent()) {
            BotEntity botEntity = botEntityOptional.get();
            botEntity.setAsset("empty");
            botEntity.setInterval("empty");
            botEntity.setStart(false);
            return botRepository.save(botEntity);
        } else {
            throw new RuntimeException("Bot not found for id " + id);
        }
    }

    @PutMapping("/updateVariable/{id}")
    public BotEntity updateBotVariableEntity(@PathVariable Long id , @RequestBody BotEntity bodyValue) {
        Optional<BotEntity> botEntityOptional = botRepository.findById(id);
        if (botEntityOptional.isPresent()) {
            BotEntity botEntity = botEntityOptional.get();
            botEntity.setAsset(bodyValue.getAsset());
            botEntity.setInterval(bodyValue.getInterval());
            botEntity.setStart(true);
            return botRepository.save(botEntity);
        } else {
            throw new RuntimeException("Bot not found for id " + id);
        }
    }
}
