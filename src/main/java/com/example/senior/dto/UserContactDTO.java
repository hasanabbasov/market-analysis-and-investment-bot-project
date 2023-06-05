package com.example.senior.dto;

import com.example.senior.entity.ProfileEntity;
import com.example.senior.entity.UsersEntity;
import lombok.*;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UserContactDTO {
    private Long userId;
    private String userName;
    private String firstname;
    private String lastname;
    private String email;
    private String nick;
    private String profileImageUrl;
    private String backgroundImageUrl;
    private String education;
    private Timestamp dateTime;
    private String twitter;
    private String facebook;
    private String live;
    private String info;
}
