package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "comment")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentID;
    @Column(name = "post_id", nullable = true)
    private Long postId;
    @Column(name = "tweet_id", nullable = true)
    private Long tweetId;
    @Column(name = "user_id", nullable = false)
    private String userId;
    @Column(length = 2500,name = "comment", nullable = false)
    private String comment;
    @Column(name = "nick", nullable = false)
    private String nick;
    @Column(name = "dateTime", nullable = false)
    private Timestamp dateTime;

}
