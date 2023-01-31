package com.example.Backend.controllers;

import com.example.Backend.models.Flight;
import com.example.Backend.services.FlightServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/flight")
@CrossOrigin("http://localhost:4200")
public class FlightController {

    @Autowired
    private FlightServices flightServices;

    @GetMapping("/getFlights")
    public List<Flight> getAllFlights(){
        return flightServices.getFlights();
    }
}
