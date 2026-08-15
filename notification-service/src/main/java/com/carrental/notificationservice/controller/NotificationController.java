package com.carrental.notificationservice.controller;

import com.carrental.notificationservice.entity.Notification;
import com.carrental.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<Notification> getMine(@RequestHeader("X-User-Email") String email) {
        return notificationService.getForUser(email);
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount(@RequestHeader("X-User-Email") String email) {
        return Map.of("count", notificationService.unreadCount(email));
    }

    @PutMapping("/{id}/read")
    public void markRead(@PathVariable("id") Long id,
                         @RequestHeader("X-User-Email") String email) {
        notificationService.markRead(id, email);
    }

    @PutMapping("/read-all")
    public void markAllRead(@RequestHeader("X-User-Email") String email) {
        notificationService.markAllRead(email);
    }
}