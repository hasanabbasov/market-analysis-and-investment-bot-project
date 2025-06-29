package com.example.senior.dto;


import com.example.senior.entity.CommentEntity;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class SocialMediaTweetDTO {
    private Long tweetId;
    private Long userId;
    private String nick;
    private int likes;
    private String tweetText;
    private Timestamp dateTime;
    private List<CommentProfileDTO> comments;
    private boolean isFollowingPoster;
    private String profileImageUrl;
    private String backgroundImageUrl;
    private String education;
    private String twitter;
    private String facebook;
    private String live;
    private String info;
}
