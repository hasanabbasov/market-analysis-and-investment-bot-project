package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "post")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Column(length = 300, name = "user_id", nullable = false)
    private Long userId;
    @Column(length = 300, name = "nick", nullable = false)
    private String nick;
    @Lob
    @Column(length = 300, name = "image_url")
    private String imageUrl;
    @Column(length = 300, name = "description")
    private String description;
    @Lob
    @Column(length = 300, name = "post_img_url")
    private String postImgUrl;
    @Column(length = 300, name = "likes")
    private int likes;
    @Column(length = 300, name = "date_time", nullable = false)
    private Timestamp dateTime;

}
