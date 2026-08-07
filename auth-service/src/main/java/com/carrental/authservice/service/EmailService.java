package com.carrental.authservice.service;


import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
        message.setTo(to);
        message.setSubject("Car Rental - Email Verification");
        message.setText("Your verification code is: " + code);

        try {
            mailSender.send(message);
            return true;
        } catch (MailException ex) {
            log.error("Failed to send verification email to {}", to, ex);
            return false;
        }
    }

    private boolean isMailConfigured() {
        return hasValue(mailUsername)
                && hasValue(mailPassword)
                && !"CHANGE_ME".equalsIgnoreCase(mailUsername)
                && !"CHANGE_ME".equalsIgnoreCase(mailPassword);
    }

    private boolean hasValue(String value) {
        return value != null && !value.isBlank();
    }
}



