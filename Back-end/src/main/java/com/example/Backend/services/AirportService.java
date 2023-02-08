package com.example.Backend.services;

import com.example.Backend.models.Airport;
import com.example.Backend.repositories.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AirportService {
    private AirportRepository airportRepository;
    @Autowired
    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public List<String> getAllAirports(){
        List<Airport> airports = airportRepository.findAll();
        List<String> airportNames= new ArrayList<>();
        for(Airport airport :airports){
            airportNames.add(airport.getAirport_name());
        }
        return airportNames;
    }
}
