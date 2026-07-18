package com.carrental.notificationservice.messaging;

import com.carrental.common.event.PaymentCompletedEvent;
import com.carrental.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentCompletedListener {

    private final NotificationService notificationService;

    @KafkaListener(topics = "payment-completed", groupId = "notification-service")
    public void onPaymentCompleted(PaymentCompletedEvent event) {
        notificationService.handlePaymentCompleted(event);
    }
}