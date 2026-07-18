package com.carrental.carservice.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;

    private String model;

    private Integer year;

    private Double price;

    @Enumerated(EnumType.STRING)
    private RentalPeriod rentalPeriod;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(unique = true, nullable = false)
    private String vin;

    @Enumerated(EnumType.STRING)
    private SellerType sellerType;

    private String location;

    private Integer mileage;

    private String currentCondition;

    private Boolean gasEquipment;

    @Enumerated(EnumType.STRING)
    private SteeringWheel steeringWheel;

    private Boolean clearedCustoms;

    private Boolean exchangePossible;

    private String color;

    private Integer wheelSize;

    private String headlights;

    private String interiorColor;

    private String interiorMaterial;

    private Boolean sunroof;

    @Column(columnDefinition = "TEXT")
    private String comfort;

    @Builder.Default
    private Boolean available = Boolean.TRUE;

    private java.time.LocalDate rentedUntil;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "car_images", joinColumns = @JoinColumn(name = "car_id"))
    @Column(name = "image_url")
    @Builder.Default
    private List<String> images = new ArrayList<>();

    private String ownerEmail;

    private String phoneNumber;
}
