package com.carrental.paymentservice.service;

import com.carrental.common.event.PaymentCompletedEvent;
import com.carrental.common.event.PaymentRequestedEvent;
import com.carrental.paymentservice.entity.Payment;
import com.carrental.paymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void processPayment(PaymentRequestedEvent request) {

        String method = request.getPaymentMethod() == null ? "CARD" : request.getPaymentMethod();
        String status = "SUCCESS";

        Payment payment = Payment.builder()
                .bookingId(request.getBookingId())
                .userEmail(request.getUserEmail())
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .status(status)
                .paymentMethod(method)
                .createdAt(LocalDateTime.now())
                .build();

        Payment saved = paymentRepository.save(payment);

        PaymentCompletedEvent event = PaymentCompletedEvent.builder()
                .bookingId(request.getBookingId())
                .paymentId(saved.getId())
                .carId(request.getCarId())
                .carName(request.getCarName())
                .userEmail(request.getUserEmail())
                .ownerEmail(request.getOwnerEmail())
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(status)
                .paymentMethod(method)
                .build();

        kafkaTemplate.send("payment-completed", event);
    }

    public List<Payment> getPayments(String userEmail) {
        return paymentRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }
}
