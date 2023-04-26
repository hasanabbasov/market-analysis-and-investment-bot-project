package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "status")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class StatusEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statusId;
    @Column(length = 300, name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "status_image_url", nullable = false)
    private String statusImageUrl;
    @Column(name = "upload_time", nullable = false)
    private Timestamp uploadTime;


}
