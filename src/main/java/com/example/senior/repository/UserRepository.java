package com.example.senior.repository;

import com.example.senior.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UsersEntity,Integer> {

    UsersEntity findByEmailAndPassword(String email, String password);
}
