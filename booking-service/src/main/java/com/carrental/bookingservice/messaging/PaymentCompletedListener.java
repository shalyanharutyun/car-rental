package com.carrental.bookingservice.messaging;

import com.carrental.bookingservice.service.BookingService;
import com.carrental.common.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentCompletedListener {

    private final BookingService bookingService;

    @KafkaListener(topics = "payment-completed", groupId = "booking-service")
    public void onPaymentCompleted(PaymentCompletedEvent event) {
        bookingService.applyPaymentResult(event);
    }
}