package com.carrental.notificationservice.service;

import com.carrental.common.event.PaymentCompletedEvent;
import com.carrental.notificationservice.entity.Notification;
import com.carrental.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public void handlePaymentCompleted(PaymentCompletedEvent event) {
        boolean success = "SUCCESS".equals(event.getStatus());
        String amount = event.getAmount() + " " + event.getCurrency();
        boolean cash = "CASH".equals(event.getPaymentMethod());

        if (success) {
            String paymentLine = cash
                    ? "Payment method: cash on pickup. " + amount + " to be paid to the owner."
                    : "Amount paid by card: " + amount + ".";
            String renterMsg = "Your booking for " + event.getCarName()
                    + " is confirmed. Rental period until " + event.getEndDate()
                    + ". " + paymentLine;
            save(event.getUserEmail(), "Booking confirmed", renterMsg, "BOOKING_CONFIRMED");
            emailService.send(event.getUserEmail(), "Car Rental - Booking confirmed", renterMsg);

            if (event.getOwnerEmail() != null
                    && !event.getOwnerEmail().equalsIgnoreCase(event.getUserEmail())) {
                String ownerMsg = "Your car " + event.getCarName()
                        + " was rented until " + event.getEndDate() + ". "
                        + (cash ? "The renter will pay " + amount + " in cash on pickup."
                                : "The renter paid " + amount + " by card.");
                save(event.getOwnerEmail(), "Your car was rented", ownerMsg, "CAR_RENTED");
                emailService.send(event.getOwnerEmail(), "Car Rental - Your car was rented", ownerMsg);
            }
        } else {
            String failMsg = "Payment for " + event.getCarName()
                    + " failed. Your booking was not confirmed.";
            save(event.getUserEmail(), "Payment failed", failMsg, "PAYMENT_FAILED");
            emailService.send(event.getUserEmail(), "Car Rental - Payment failed", failMsg);
        }
    }

    private void save(String recipient, String title, String message, String type) {
        Notification notification = Notification.builder()
                .recipientEmail(recipient)
                .title(title)
                .message(message)
                .type(type)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
    }

    public List<Notification> getForUser(String email) {
        return notificationRepository.findByRecipientEmailOrderByCreatedAtDesc(email);
    }

    public long unreadCount(String email) {
        return notificationRepository.countByRecipientEmailAndReadFalse(email);
    }

    public void markRead(Long id, String email) {
        notificationRepository.findById(id)
                .filter(n -> n.getRecipientEmail().equalsIgnoreCase(email))
                .ifPresent(n -> {
                    n.setRead(true);
                    notificationRepository.save(n);
                });
    }

    public void markAllRead(String email) {
        List<Notification> list = notificationRepository.findByRecipientEmailOrderByCreatedAtDesc(email);
        list.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(list);
    }
}