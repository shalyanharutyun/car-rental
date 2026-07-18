package com.carrental.carservice.service;


import com.carrental.carservice.dto.PageResponse;
import com.carrental.carservice.entity.Car;
import com.carrental.carservice.repository.CarRepository;
import com.carrental.carservice.storage.FileStorageService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private static final int MIN_IMAGES = 5;

    private final CarRepository carRepository;
    private final FileStorageService fileStorageService;

    public PageResponse<Car> getAllCars(int page, int size, Integer yearFrom, Integer yearTo, String location) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1));
        Specification<Car> spec = buildFilterSpec(yearFrom, yearTo, location);
        return PageResponse.of(carRepository.findAll(spec, pageable));
    }

    private Specification<Car> buildFilterSpec(Integer yearFrom, Integer yearTo, String location) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (yearFrom != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("year"), yearFrom));
            }

            if (yearTo != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("year"), yearTo));
            }

            if (StringUtils.hasText(location)) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public List<Car> getCarsByOwner(String ownerEmail) {
        return carRepository.findByOwnerEmail(ownerEmail);
    }

    public Car createCar(Car car, List<MultipartFile> images, String ownerEmail) {
        String vin = car.getVin() == null ? "" : car.getVin().trim();

        if (!StringUtils.hasText(vin)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "VIN is required");
        }

        List<MultipartFile> validImages = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                if (image != null && !image.isEmpty()) {
                    validImages.add(image);
                }
            }
        }

        if (validImages.size() < MIN_IMAGES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "At least " + MIN_IMAGES + " images are required");
        }

        if (carRepository.existsByVin(vin)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "A car with this VIN already exists");
        }

        car.setVin(vin);
        car.setOwnerEmail(ownerEmail);
        car.setAvailable(true);
        car.setRentedUntil(null);

        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : validImages) {
            imageUrls.add(fileStorageService.store(image));
        }
        car.setImages(imageUrls);

        return carRepository.save(car);
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
    }

    public void markRented(Long carId, java.time.LocalDate until) {
        carRepository.findById(carId).ifPresent(car -> {
            car.setAvailable(false);
            car.setRentedUntil(until);
            carRepository.save(car);
        });
    }

    public void releaseExpiredRentals(java.time.LocalDate today) {
        List<Car> expired = carRepository.findByAvailableFalseAndRentedUntilBefore(today);
        for (Car car : expired) {
            car.setAvailable(true);
            car.setRentedUntil(null);
        }
        if (!expired.isEmpty()) {
            carRepository.saveAll(expired);
        }
    }

    public void deleteCar(Long id, String ownerEmail) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

        if (car.getOwnerEmail() == null || !car.getOwnerEmail().equals(ownerEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own cars");
        }

        carRepository.delete(car);
    }
}
