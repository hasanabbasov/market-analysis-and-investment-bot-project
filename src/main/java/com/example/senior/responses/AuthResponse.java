package com.example.senior.responses;

import lombok.Data;

@Data
public class AuthResponse {
    String message;
    String userName;
    Long userId;
    String accessToken;
    String refreshToken;
}