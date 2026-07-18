package com.carrental.notificationservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipientEmail;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String type;

    @Column(name = "is_read")
    private boolean read;

    private LocalDateTime createdAt;
}