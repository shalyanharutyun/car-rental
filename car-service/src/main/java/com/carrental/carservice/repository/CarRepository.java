package com.carrental.carservice.repository;


import com.carrental.carservice.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {

    List<Car> findByOwnerEmail(String ownerEmail);

    boolean existsByVin(String vin);

    List<Car> findByAvailableFalseAndRentedUntilBefore(LocalDate date);
}
