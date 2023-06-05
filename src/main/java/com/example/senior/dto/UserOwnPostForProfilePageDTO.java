package com.example.senior.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UserOwnPostForProfilePageDTO {
    private Long postId;
    private Long userId;
    private String nick;
    private String imageUrl;
    private String description;
    private String postImgUrl;
    private int likes;
    private Timestamp dateTime;
    private String profileImageUrl;
    private String backgroundImageUrl;
}
