package com.carrental.bookingservice.client;

import com.carrental.bookingservice.dto.CarDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "car-service", url = "${car-service.url:http://localhost:8081}")
public interface CarClient {

    @GetMapping("/cars/{id}")
    CarDto getCarById(@PathVariable("id") Long id);
}