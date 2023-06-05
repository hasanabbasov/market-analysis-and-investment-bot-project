package com.example.senior.dto;

import lombok.*;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UserOwnTweetForProfilePageDTO {
    private Long postId;
    private Long userId;
    private String nick;
    private String tweetText;
    private int likes;
    private Timestamp dateTime;
    private String profileImageUrl;
    private String backgroundImageUrl;
}
