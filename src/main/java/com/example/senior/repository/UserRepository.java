package com.example.senior.repository;

import com.example.senior.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;


@Repository
public interface UserRepository extends JpaRepository<UsersEntity, Long> {

    UsersEntity findByEmailAndPassword(String email, String password);

    UsersEntity findByUserName(String username);

//    UsersEntity findById(Long id);
}
