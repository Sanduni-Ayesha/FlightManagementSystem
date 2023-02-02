package com.example.Backend.services;

import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightServices {
    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> getFlights(){
        return flightRepository.getFlights();
    }
    public Flight getFlightByID(int id){
        return flightRepository.getFlightByID(id);
    }

    public boolean deleteFlight(int id){
        return flightRepository.deleteFlight(id);
    }

    public Flight addFlight(Flight flight){
        return flightRepository.addFlight(flight);
    }

    public Flight updateFlight(Flight fl){
        return flightRepository.updateFlight(fl);
    }
}
