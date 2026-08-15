package com.carrental.paymentservice.messaging;

import com.carrental.common.event.PaymentRequestedEvent;
import com.carrental.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentRequestListener {

    private final PaymentService paymentService;

    @KafkaListener(topics = "payment-requested", groupId = "payment-service")
    public void onPaymentRequested(PaymentRequestedEvent event) {
        paymentService.processPayment(event);
    }
}
