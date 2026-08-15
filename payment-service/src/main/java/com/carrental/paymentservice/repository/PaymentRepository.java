package com.carrental.paymentservice.repository;

import com.carrental.paymentservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByUserEmailOrderByCreatedAtDesc(String userEmail);
}
