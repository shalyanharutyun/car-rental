package com.carrental.bookingservice.service;

import com.carrental.bookingservice.client.CarClient;
import com.carrental.bookingservice.dto.CarDto;
import com.carrental.bookingservice.entity.Booking;
import com.carrental.bookingservice.entity.BookingStatus;
import com.carrental.bookingservice.entity.PaymentMethod;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.common.event.PaymentCompletedEvent;
import com.carrental.common.event.PaymentRequestedEvent;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarClient carClient;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public Booking createBooking(Booking booking, String userEmail) {

        if (booking.getCarId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Car id is required");
        }

        CarDto car = loadCar(booking.getCarId());

        if (Boolean.FALSE.equals(car.getAvailable())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This car is currently rented");
        }

        if (booking.getStartDate() == null || booking.getEndDate() == null
                || booking.getEndDate().isBefore(booking.getStartDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid rental dates");
        }

        if (booking.getStartDate().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date cannot be in the past");
        }

        if (car.getPrice() == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This car has no price set");
        }

        long units = calculateUnits(car.getRentalPeriod(), booking.getStartDate(), booking.getEndDate());
        double total = car.getPrice() * units;

        booking.setId(null);
        if (booking.getPaymentMethod() == null) {
            booking.setPaymentMethod(PaymentMethod.CARD);
        }
        booking.setCarName(car.getBrand() + " " + car.getModel());
        booking.setUserEmail(userEmail);
        booking.setUserName(userEmail);
        booking.setOwnerEmail(car.getOwnerEmail());
        booking.setTotalPrice(total);
        booking.setCurrency(car.getCurrency());
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());

        Booking saved = bookingRepository.save(booking);

        PaymentRequestedEvent event = PaymentRequestedEvent.builder()
                .bookingId(saved.getId())
                .carId(saved.getCarId())
                .carName(saved.getCarName())
                .userEmail(saved.getUserEmail())
                .ownerEmail(saved.getOwnerEmail())
                .amount(saved.getTotalPrice())
                .currency(saved.getCurrency())
                .startDate(saved.getStartDate())
                .endDate(saved.getEndDate())
                .paymentMethod(saved.getPaymentMethod().name())
                .build();

        kafkaTemplate.send("payment-requested", event);

        return saved;
    }

    private CarDto loadCar(Long carId) {
        try {
            return carClient.getCarById(carId);
        } catch (FeignException.NotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found");
        } catch (FeignException e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Car service is unavailable");
        }
    }

    public void applyPaymentResult(PaymentCompletedEvent event) {
        bookingRepository.findById(event.getBookingId()).ifPresent(booking -> {
            booking.setStatus("SUCCESS".equals(event.getStatus())
                    ? BookingStatus.CONFIRMED : BookingStatus.FAILED);
            bookingRepository.save(booking);
        });
    }

    private long calculateUnits(String rentalPeriod, LocalDate start, LocalDate end) {
        if ("MONTHLY".equals(rentalPeriod)) {
            long months = ChronoUnit.MONTHS.between(start, end);
            return months <= 0 ? 1 : months;
        }
        long days = ChronoUnit.DAYS.between(start, end);
        return days <= 0 ? 1 : days;
    }

    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    public List<Booking> getMyBookings(String userEmail) {
        return bookingRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }
}