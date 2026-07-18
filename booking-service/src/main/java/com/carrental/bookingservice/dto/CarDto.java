package com.carrental.bookingservice.dto;

import lombok.Data;

@Data
public class CarDto {
    private Long id;
    private String brand;
    private String model;
    private Integer year;
    private Double price;
    private String currency;
    private String rentalPeriod;
    private Boolean available;
    private String ownerEmail;
}