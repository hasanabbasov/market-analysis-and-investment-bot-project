package com.example.senior.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "profile")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class ProfileEntity {
    @Id
    @Column(length = 300, name = "user_id", nullable = false)
    private Long userId;

    @Column(length = 300, name = "nick", nullable = false)
    private String nick;

    @Lob
    @Column(length = 300, name = "profile_image_url", nullable = true)
    private String profileImageUrl;

    @Lob
    @Column(length = 300, name = "background_img_url", nullable = true)
    private String backgroundImageUrl;

    @Column(length = 300, name = "education", nullable = true)
    private String education;

    @Column(length = 300, name = "twitter", nullable = true)
    private String twitter;

    @Column(length = 300, name = "facebook", nullable = true)
    private String facebook;

    @Column(length = 300, name = "live", nullable = true)
    private String live;

    @Column(length = 300, name = "info", nullable = true)
    private String info;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id") // User ile join yapmak için
    @JsonIgnore
    private UsersEntity user;

}
