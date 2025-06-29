package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "binance")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class BinanceEntity {
    @Id
    private Long userId;

    @Column(length = 600, name = "api_key")
    private String apiKey;

    @Column(length = 600, name = "secruty_key")
    private String secrutyKey;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_id")
    private UsersEntity user;
}
