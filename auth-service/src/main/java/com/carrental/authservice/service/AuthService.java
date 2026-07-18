package com.carrental.authservice.service;

import com.carrental.authservice.dto.AuthResponse;
import com.carrental.authservice.dto.LoginRequest;
import com.carrental.authservice.dto.MessageResponse;
import com.carrental.authservice.dto.RegisterRequest;
import com.carrental.authservice.entity.Provider;
import com.carrental.authservice.entity.Role;
import com.carrental.authservice.entity.User;
import com.carrental.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public MessageResponse register(RegisterRequest request) {

        User existing = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (existing != null && existing.isEnabled()) {
            throw new RuntimeException("Email already exists");
        }

        String code = String.valueOf((int) (Math.random() * 900000) + 100000);

        User user = (existing != null) ? existing : new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setProvider(Provider.LOCAL);
        user.setCreatedAt(LocalDateTime.now());
        user.setEnabled(false);
        user.setVerificationCode(code);
        user.setCodeExpiresAt(LocalDateTime.now().plusMinutes(3));

        userRepository.save(user);

        emailService.sendVerificationCode(user.getEmail(), code);

        return new MessageResponse("Verification code sent to your email");
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getPassword() == null) {
            throw new RuntimeException("This account uses Google sign-in");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.isEnabled()) {
            throw new RuntimeException("Please verify your email first");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }

    public AuthResponse verify(String email, String code) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isEnabled()) {
            throw new RuntimeException("Account already verified");
        }

        if (user.getCodeExpiresAt() == null || LocalDateTime.now().isAfter(user.getCodeExpiresAt())) {
            throw new RuntimeException("Verification code expired");
        }

        if (!code.equals(user.getVerificationCode())) {
            throw new RuntimeException("Invalid verification code");
        }

        user.setEnabled(true);
        user.setVerificationCode(null);
        user.setCodeExpiresAt(null);
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }
}