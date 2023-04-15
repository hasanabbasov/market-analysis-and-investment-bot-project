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
    private Long userId;
    @Column(length = 600, name = "api-key")
    private String apiKey;
    @Column(length = 600, name = "secruty-key")
    private String secrutyKey;
}
