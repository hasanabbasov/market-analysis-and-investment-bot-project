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
    @Column(name = "post_id", nullable = false)
    private Long postID;
    @Column(name = "user_id", nullable = false)
    private String userID;
    @Column(name = "user_image", nullable = false)
    private String comment;
    @Column(name = "nick", nullable = false)
    private Timestamp timestamp;

}
