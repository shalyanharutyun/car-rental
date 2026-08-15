package com.carrental.carservice.scheduler;

import com.carrental.carservice.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class RentalReleaseScheduler {

    private final CarService carService;

    @Scheduled(cron = "0 0 * * * *")
    public void releaseExpiredRentals() {
        carService.releaseExpiredRentals(LocalDate.now());
    }
}