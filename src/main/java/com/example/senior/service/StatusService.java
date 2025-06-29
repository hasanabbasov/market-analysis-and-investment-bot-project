package com.example.senior.service;

import com.example.senior.entity.StatusEntity;
import com.example.senior.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StatusService {
    @Autowired
    StatusRepository statusRepo;

    public List<StatusEntity> saveStatus(StatusEntity status) {

        Date date=new Date();
        long time=date.getTime();
        Timestamp dateTime=new Timestamp(time);
        status.setUploadTime(dateTime);
        statusRepo.save(status);
        return getAllStatus();
    }

    public List<StatusEntity> getAllStatus(){
        List<StatusEntity> result = new ArrayList<>();
        result = statusRepo.findAll();
        result.sort((e1, e2) -> e2.getUploadTime().compareTo(e1.getUploadTime()));
        return result;
    }
}
