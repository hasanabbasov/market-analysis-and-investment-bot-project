package com.example.senior.dto;


import lombok.*;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UserProfileDto {
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
