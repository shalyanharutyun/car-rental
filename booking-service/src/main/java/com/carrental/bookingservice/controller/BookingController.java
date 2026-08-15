package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.entity.Booking;
import com.carrental.bookingservice.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public Booking create(@RequestBody Booking booking,
                          @RequestHeader("X-User-Email") String userEmail) {
        return bookingService.createBooking(booking, userEmail);
    }

    @GetMapping
    public List<Booking> getAll() {
        return bookingService.getAll();
    }

    @GetMapping("/mine")
    public List<Booking> getMine(@RequestHeader("X-User-Email") String userEmail) {
        return bookingService.getMyBookings(userEmail);
    }
}