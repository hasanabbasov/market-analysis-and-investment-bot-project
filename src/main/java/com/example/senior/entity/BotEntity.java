package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "bot")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class BotEntity {
    @Id
    @Column(length = 600, name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "asset", nullable = false)
    private String asset;
    @Column(name = "interval", nullable = false)
    private String interval;
    @Column(name = "start", nullable = false)
    private boolean start;
}
