package com.example.Backend.controllers;

import com.example.Backend.models.Flight;
import com.example.Backend.services.FlightServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getFlights/{id}")
    public Flight getFlightByID(@PathVariable("id") int id){
        return flightServices.getFlightByID(id-1);
    }

    @DeleteMapping("/getFlights/{id}")
    public boolean deleteFlightByID(@PathVariable("id") int id){
        return flightServices.deleteFlight(id);
    }
}
