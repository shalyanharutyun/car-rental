package com.carrental.paymentservice.controller;

import com.carrental.paymentservice.entity.Payment;
import com.carrental.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/mine")
    public List<Payment> getMine(@RequestHeader("X-User-Email") String userEmail) {
        return paymentService.getPayments(userEmail);
    }
}
