package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "tweet")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class TweetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tweetId;
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "nick", nullable = false)
    private String nick;
    @Column(length = 300, name = "likes")
    private int likes;
    @Column(length = 300, name = "tweet")
    private String tweetText;
    @Column(name = "timestamp", nullable = false)
    private Timestamp dateTime;
}
