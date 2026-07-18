package com.carrental.carservice.messaging;

import com.carrental.carservice.service.CarService;
import com.carrental.common.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentEventListener {

    private final CarService carService;

    @KafkaListener(topics = "payment-completed", groupId = "car-service")
    public void onPaymentCompleted(PaymentCompletedEvent event) {
        if ("SUCCESS".equals(event.getStatus())) {
            carService.markRented(event.getCarId(), event.getEndDate());
        }
    }
}