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
public class SocialMediaPostDTO {
    private Long postId;
    private Long userId;
    private String nick;
    private String imageUrl;
    private String description;
    private String postImgUrl;
    private int likes;
    private Timestamp dateTime;
    private List<CommentProfileDTO> comments;
    private String profileImageUrl;
    private String backgroundImageUrl;
    private String education;
    private String twitter;
    private String facebook;
    private String live;
    private String info;
}
