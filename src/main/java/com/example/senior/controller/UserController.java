package com.example.senior.controller;

import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.UserRepository;
import com.example.senior.responses.AuthResponse;
import com.example.senior.security.JwtTokenProvider;
import com.example.senior.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    private PasswordEncoder passwordEncoder;
    private UserService userService;
//    private RefreshTokenService refreshTokenService;


    public UserController(UserRepository userRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder, UserService userService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UsersEntity> getAllUsers(){
        List<UsersEntity> getAllUsersList = userRepository.findAll();
        return getAllUsersList;
    }

    @GetMapping("/id")
    public UsersEntity getUserId(@PathVariable(value = "id") Long userId){
        return userRepository.findById(userId).get();
    }

//    @PostMapping("/register")
//    public UsersEntity createUser(@RequestBody UsersEntity userEntity){
//        return userRepository.save(userEntity);
//    }

//    @PostMapping("/login")
//    public ResponseEntity<UsersEntity> login(@RequestBody UsersEntity user) {
//        UsersEntity result = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
//        if(result != null) {
//            return ResponseEntity.ok(result);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    }


    @PostMapping("/login")
    public AuthResponse login(@RequestBody UsersEntity loginRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);
        UsersEntity user = userService.getOneUserByUserName(loginRequest.getUserName());
        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccessToken(jwtToken);
//        authResponse.setRefreshToken(refreshTokenService.createRefreshToken(user));
        authResponse.setUserId(user.getUserId());
        authResponse.setUserName(user.getUserName());
        return authResponse;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UsersEntity registerRequest) {
        AuthResponse authResponse = new AuthResponse();
        if(userService.getOneUserByUserName(registerRequest.getUserName()) != null) {
            authResponse.setMessage("Username already in use.");
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }

        UsersEntity user = new UsersEntity();
        user.setUserName(registerRequest.getUserName());
        user.setFirstname(registerRequest.getFirstname());
        user.setLastname(registerRequest.getLastname());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userService.saveOneUser(user);
        authResponse.setMessage("User successfully registered.");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }


}
