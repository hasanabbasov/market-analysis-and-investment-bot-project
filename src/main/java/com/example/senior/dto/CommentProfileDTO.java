package com.example.senior.dto;


import lombok.*;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class CommentProfileDTO {
    private Long commentID;
    private Long postId;
    private Long tweetId;
    private String userId;
    private String comment;
    private String nick;
    private Timestamp dateTime;
    private String profileImageUrl;
    private String backgroundImageUrl;
    private String education;
    private String twitter;
    private String facebook;
    private String live;
    private String info;
}
