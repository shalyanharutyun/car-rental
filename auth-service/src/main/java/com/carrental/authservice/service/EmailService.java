package com.carrental.authservice.service;


import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${spring.mail.password:}")
    private String mailPassword;

    public boolean sendVerificationCode(String to, String code) {
        if (!isMailConfigured()) {
            log.warn("Mail is not configured; skipping verification email for {}. Verification code: {}", to, code);
            return false;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(normalizeUsername());
        message.setTo(to);
        message.setSubject("Car Rental - Email Verification");
        message.setText("Your verification code is: " + code);

        try {
            applyNormalizedCredentials();
            mailSender.send(message);
            return true;
        } catch (MailException ex) {
            log.error("Failed to send verification email to {}", to, ex);
            return false;
        }
    }

    private boolean isMailConfigured() {
        String username = normalizeUsername();
        String password = normalizePassword();

        return hasValue(username)
                && hasValue(password)
                && !"CHANGE_ME".equalsIgnoreCase(username)
                && !"CHANGE_ME".equalsIgnoreCase(password);
    }

    private boolean hasValue(String value) {
        return value != null && !value.isBlank();
    }

    private void applyNormalizedCredentials() {
        if (mailSender instanceof JavaMailSenderImpl) {
            JavaMailSenderImpl sender = (JavaMailSenderImpl) mailSender;
            sender.setUsername(normalizeUsername());
            sender.setPassword(normalizePassword());
        }
    }

    private String normalizeUsername() {
        return mailUsername == null ? "" : mailUsername.trim();
    }

    private String normalizePassword() {
        return mailPassword == null ? "" : mailPassword.replaceAll("\\s+", "");
    }
}



