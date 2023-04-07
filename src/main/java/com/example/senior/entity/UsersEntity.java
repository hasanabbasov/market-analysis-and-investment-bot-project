package com.example.senior.entity;

import lombok.*;

import javax.persistence.*;

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

    public UsersEntity() {

    }
}
