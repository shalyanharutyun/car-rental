package com.carrental.common.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestedEvent {

    private Long bookingId;
    private Long carId;
    private String carName;
    private String userEmail;
    private String ownerEmail;
    private Double amount;
    private String currency;
    private LocalDate startDate;
    private LocalDate endDate;
    private String paymentMethod;
}