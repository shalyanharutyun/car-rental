package com.carrental.authservice.controller;

import com.carrental.authservice.dto.AuthResponse;
import com.carrental.authservice.dto.LoginRequest;
import com.carrental.authservice.dto.MessageResponse;
import com.carrental.authservice.dto.RegisterRequest;
import com.carrental.authservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public MessageResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/verify")
    public AuthResponse verify(@RequestParam("email") String email, @RequestParam("code") String code) {
        return authService.verify(email, code);
    }
}