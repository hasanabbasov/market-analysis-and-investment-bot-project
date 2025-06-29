package com.example.senior.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users" , uniqueConstraints = @UniqueConstraint(columnNames = "nick"))
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 300, name = "nick", nullable = false)
    private String userName;

    @Column(length = 300, name = "name", nullable = false)
    private String firstname;

    @Column(length = 300, name = "surname",nullable = false)
    private String lastname;

    @Column(length = 300, name = "email",nullable = false)
    private String email;

    @Column(name = "password",nullable = false)
    private String password;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private ProfileEntity profile;


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private BinanceEntity chart;


    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinTable(
            name = "follows",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_id")
    )
    private Set<UsersEntity> followed = new HashSet<>();

    @ManyToMany(mappedBy = "followed")
    @JsonIgnore
    private Set<UsersEntity> followers = new HashSet<>();

    public UsersEntity() {

    }

    // Add and remove followers convenience methods
    public void addFollowed(UsersEntity user) {
        followed.add(user);
        user.getFollowers().add(this);
    }

    public void removeFollowed(UsersEntity user) {
        followed.remove(user);
        user.getFollowers().remove(this);
    }

    // Add and remove following convenience methods
    public void addFollower(UsersEntity user) {
        followers.add(user);
        user.getFollowed().add(this);
    }

    public void removeFollower(UsersEntity user) {
        followers.remove(user);
        user.getFollowed().remove(this);
    }
}
