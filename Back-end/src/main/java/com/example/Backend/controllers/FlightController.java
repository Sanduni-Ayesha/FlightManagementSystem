package com.example.Backend.controllers;

import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.models.Flight;
import com.example.Backend.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/flight")
public class FlightController {
    private FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @PostMapping("/getFlights")
    public ResponseEntity<List<Flight>> searchFlights(@RequestBody SearchDTO searchDTO) {
        return new ResponseEntity<>(flightService.searchFlights(searchDTO), HttpStatus.OK);
    }

    @GetMapping("/getFlights/{id}")
    public ResponseEntity<Flight> getFlightByID(@PathVariable("id") int id) {
        return new ResponseEntity<>(flightService.getFlightByID(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteFlight/{id}")
    public ResponseEntity<FlightDto> deleteFlightByID(@PathVariable("id") int id) {
        return new ResponseEntity<>(flightService.deleteFlight(id), HttpStatus.OK);
    }

    @PostMapping("/addFlight")
    public ResponseEntity<FlightDto> addFlight(@RequestBody FlightDto flightDto) {
        flightDto.setCreatedTime(LocalDateTime.now());
        flightDto.setLastUpdatedTime(LocalDateTime.now());
        return new ResponseEntity<>(flightService.addFlight(flightDto), HttpStatus.OK);
    }

    @PutMapping("/updateFlight")
    public ResponseEntity<FlightDto> updateFlight(@RequestBody FlightDto flightDto) {
        return new ResponseEntity<>(flightService.updateFlight(flightDto), HttpStatus.OK);
    }
}
