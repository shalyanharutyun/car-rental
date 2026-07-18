package com.carrental.carservice.controller;


import com.carrental.carservice.dto.PageResponse;
import com.carrental.carservice.entity.Car;
import com.carrental.carservice.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @GetMapping
    public PageResponse<Car> getAllCars(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "12") int size,
                                         @RequestParam(required = false) Integer yearFrom,
                                         @RequestParam(required = false) Integer yearTo,
                                         @RequestParam(required = false) String location) {
        return carService.getAllCars(page, size, yearFrom, yearTo, location);
    }

    @GetMapping("/mine")
    public List<Car> getMyCars(@RequestHeader("X-User-Email") String ownerEmail) {
        return carService.getCarsByOwner(ownerEmail);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Car createCar(@RequestPart("car") Car car,
                          @RequestPart("images") List<MultipartFile> images,
                          @RequestHeader("X-User-Email") String ownerEmail) {
        return carService.createCar(car, images, ownerEmail);
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable("id") Long id) {
        return carService.getCarById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable("id") Long id,
                          @RequestHeader("X-User-Email") String ownerEmail) {
        carService.deleteCar(id, ownerEmail);
    }
}
