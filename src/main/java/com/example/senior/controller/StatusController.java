package com.example.senior.controller;

import com.example.senior.entity.StatusEntity;
import com.example.senior.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("status")
public class StatusController {

    @Autowired
    StatusService statusService;

    @PostMapping("/save")
    public List<StatusEntity> saveStatus(@RequestBody StatusEntity status) {
        return statusService.saveStatus(status);
    }


    @GetMapping("/getAllStatus")
    public List<StatusEntity> getAllStatus() {
        return statusService.getAllStatus();
    }
}
