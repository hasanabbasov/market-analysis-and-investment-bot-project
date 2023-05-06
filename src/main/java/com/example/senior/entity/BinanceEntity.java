package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "chart")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class BinanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 600, name = "user_id", nullable = false)
    private Long userId;
    @Column(length = 600, name = "api_key")
    private String apiKey;
    @Column(length = 600, name = "secruty_key")
    private String secrutyKey;
}
