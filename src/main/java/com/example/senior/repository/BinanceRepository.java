package com.example.senior.repository;

import com.example.senior.entity.BinanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BinanceRepository extends JpaRepository<BinanceEntity, Long> {
}
