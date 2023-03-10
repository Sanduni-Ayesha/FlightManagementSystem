package com.example.Backend.controllers;

import com.example.Backend.models.Airport;
import com.example.Backend.services.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/airport")
public class AirportController {
    private AirportService airportService;

    @Autowired
    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping("/get-airport")
    public List<Airport> getAllAirport() {
        return this.airportService.getAllAirports();
    }
}
