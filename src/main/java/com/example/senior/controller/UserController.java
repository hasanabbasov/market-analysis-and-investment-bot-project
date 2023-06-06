package com.example.senior.controller;

import com.example.senior.dto.UserContactDTO;
import com.example.senior.entity.ProfileEntity;
import com.example.senior.entity.UsersEntity;
import com.example.senior.repository.ProfileRepository;
import com.example.senior.repository.UserRepository;
import com.example.senior.responses.AuthResponse;
import com.example.senior.security.JwtTokenProvider;
import com.example.senior.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private ProfileRepository profileRepository;
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

    @GetMapping("/{id}")
    public UsersEntity getUserId(@PathVariable(value = "id") Long userId){
        return userRepository.findById(userId).get();
    }


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

        ProfileEntity profile = new ProfileEntity();
        profile.setUserId(user.getUserId()); // UserID'yi atayın
        profile.setNick(registerRequest.getUserName());
        profile.setUser(user); // User ilişkisini ayarlayın

        user.setProfile(profile); // User ile Profile arasındaki ilişkiyi ayarlayın

        userService.saveOneUser(user);
        profileRepository.save(profile); // Profili kaydedin
        authResponse.setMessage("User successfully registered.");


        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }


    @PostMapping("/{userId}/follow/{followedId}")
    public ResponseEntity<Void> follow(@PathVariable("userId") Long userId, @PathVariable("followedId") Long followedId) {
        userService.addFollowed(userId, followedId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{userId}/unfollow/{followedId}")
    public ResponseEntity<Void> unfollow(@PathVariable("userId") Long userId, @PathVariable("followedId") Long followedId) {
        userService.removeFollowed(userId, followedId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<UserContactDTO>> getFollowing(@PathVariable Long userId) {
        List<UserContactDTO> following = userService.getFollowing(userId);
        return ResponseEntity.ok(following);
    }


    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UsersEntity>> getFollowers(@PathVariable Long userId) {
        List<UsersEntity> followers = userService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }


}
