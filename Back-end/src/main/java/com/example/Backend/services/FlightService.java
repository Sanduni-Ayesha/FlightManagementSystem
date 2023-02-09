package com.example.Backend.services;

import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FlightService {

    private FlightRepository flightRepository;
    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public Flight getFlightByID(int id) {
        return flightRepository.findById(id).orElse(null);
    }

    public void deleteFlight(int id) {
        Flight flight = getFlightByID(id);
        flight.setStatus(Flight.Status.inactive);
        flightRepository.save(flight);
    }

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
     }

    public Flight updateFlight(Flight fl) {
        Flight flight = getFlightByID(fl.getId());
        flight.setDepartureAirport(fl.getDepartureAirport());
        flight.setArrivalAirport(fl.getArrivalAirport());
        flight.setFlightNo(fl.getFlightNo());
        flight.setDepartureTime(fl.getDepartureTime());
        flight.setArrivalTime(fl.getArrivalTime());
        flight.setLastUpdatedTime(LocalDateTime.now());
        flight.setVersion(fl.getVersion() + 1);
        return flightRepository.save(flight);
    }

    public boolean checkData(Flight flight) {
        String departureAirport = flight.getDepartureAirport();
        String arrivalAirport = flight.getArrivalAirport();
        String flightNo = flight.getFlightNo();
        LocalDateTime departureTime = flight.getDepartureTime();
        LocalDateTime arrivalTime = flight.getArrivalTime();

        if (departureAirport.matches("[A-Z]{3}") &&
                arrivalAirport.matches("[A-Z]{3}") &&
                flightNo.matches("[A-Za-z]{2}[0-9]{4}") &&
                departureTime.isAfter(LocalDateTime.now()) &&
                departureTime.isBefore(arrivalTime)) {
            return true;
        }
        return false;
    }
}
