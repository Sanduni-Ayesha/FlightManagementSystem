package com.example.Backend.controllers;

import com.example.Backend.models.Flight;
import com.example.Backend.dao.FlightDao;
import com.example.Backend.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/flight")
@CrossOrigin("http://localhost:4200")
public class FlightController {
    private FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @Validated
    @GetMapping("/getFlights/{departure}/{arrival}")
    public ResponseEntity<List<Flight>> getAllFlights(@PathVariable("departure") String departure, @PathVariable("arrival") String arrival) {
        return new ResponseEntity<>(flightService.searchFlights(departure, arrival), HttpStatus.OK);
    }

    @GetMapping("/getFlights/{id}")
    public ResponseEntity<Flight> getFlightByID(@PathVariable("id") int id) {
        return new ResponseEntity<>(flightService.getFlightByID(id - 1), HttpStatus.OK);
    }

    @DeleteMapping("/deleteFlight/{id}")
    public ResponseEntity<Flight> deleteFlightByID(@PathVariable("id") int id) {
        return new ResponseEntity<>(flightService.deleteFlight(id), HttpStatus.OK);
    }

    @PostMapping("/addFlight")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
        flight.setCreatedTime(LocalDateTime.now());
        flight.setLastUpdatedTime(LocalDateTime.now());
        return new ResponseEntity<>(flightService.addFlight(flight), HttpStatus.OK);
    }

    @PutMapping("/updateFlight")
    public ResponseEntity<Flight> updateFlight(@RequestBody Flight flight) {
        return new ResponseEntity<>(flightService.updateFlight(flight), HttpStatus.OK);
    }
}
