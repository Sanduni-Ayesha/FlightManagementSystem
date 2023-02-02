package com.example.Backend.controllers;

import com.example.Backend.models.Flight;
import com.example.Backend.services.FlightServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flight")
@CrossOrigin("http://localhost:4200")
public class FlightController {

    @Autowired
    private FlightServices flightServices;

    @GetMapping("/getFlights")
    public ResponseEntity<List<Flight>> getAllFlights(){
        return new ResponseEntity<>(flightServices.getFlights(), HttpStatus.OK);
    }

    @GetMapping("/getFlights/{id}")
    public ResponseEntity<Flight> getFlightByID(@PathVariable("id") int id){
        return new ResponseEntity<>(flightServices.getFlightByID(id-1), HttpStatus.OK);
    }

    @DeleteMapping("/getFlights/{id}")
    public ResponseEntity<Boolean> deleteFlightByID(@PathVariable("id") int id){
        return new ResponseEntity<>(flightServices.deleteFlight(id), HttpStatus.OK);
    }

    @PostMapping("/addFlight")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight){
        return new ResponseEntity<>(flightServices.addFlight(flight), HttpStatus.OK);
    }

    @PutMapping("/updateFlight")
    public ResponseEntity<Flight> updateFlight(@RequestBody Flight flight){
        return new ResponseEntity<>(flightServices.updateFlight(flight), HttpStatus.OK);
    }
}
