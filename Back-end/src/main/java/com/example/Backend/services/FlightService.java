package com.example.Backend.services;

import com.example.Backend.exceptions.Exceptions;
import com.example.Backend.responseStatusCodes.ResponseStatusCodes;
import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightRepository;
import jakarta.transaction.Transactional;
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
        return flightRepository.findById(id).orElseThrow(() -> new Exceptions(ResponseStatusCodes.FLIGHT_NOT_FOUND_EXCEPTION));
    }

    public Flight deleteFlight(int id) {
        Flight flight = getFlightByID(id);
        if (flight.getStatus().equals(Flight.Status.inactive)){
            throw new Exceptions(ResponseStatusCodes.FLIGHT_ALREADY_DELETED_EXCEPTION);
        }
        flight.setStatus(Flight.Status.inactive);
        flightRepository.save(flight);
        return flight;
    }

    public Flight addFlight(Flight flight) {
        boolean checkDepartureAndArrival = checkFlightExistence(flight);
        boolean flightValidated = validateFlight(flight);
        if (checkDepartureAndArrival) {
            throw new Exceptions(ResponseStatusCodes.FLIGHT_EXISTS_EXCEPTION);
        }
        if (!flightValidated) {
            throw new Exceptions(ResponseStatusCodes.INVALID_FLIGHT_EXCEPTION);
        }
        return flightRepository.save(flight);
     }

    public Flight updateFlight(Flight fl) {
        Flight flight = getFlightByID(fl.getId());
        boolean checkDeparture = checkFlightExistence(fl);
        boolean flightValidated = validateFlight(fl);
        if (checkDeparture) {
            throw new Exceptions(ResponseStatusCodes.FLIGHT_EXISTS_EXCEPTION);
        }
        if (!flightValidated) {
            throw new Exceptions(ResponseStatusCodes.INVALID_FLIGHT_EXCEPTION);
        }

        if (fl.getVersion()==flight.getVersion()){
            flight.setDepartureAirport(fl.getDepartureAirport());
            flight.setArrivalAirport(fl.getArrivalAirport());
            flight.setFlightNo(fl.getFlightNo());
            flight.setDepartureTime(fl.getDepartureTime());
            flight.setArrivalTime(fl.getArrivalTime());
            flight.setLastUpdatedTime(LocalDateTime.now());
            flight.setVersion(fl.getVersion() + 1);
            return flightRepository.save(flight);
        }else{
            throw new Exceptions(ResponseStatusCodes.FLIGHT_ALREADY_UPDATED_EXCEPTION);
        }
    }

    public boolean validateFlight(Flight flight) {
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

    public boolean checkFlightExistence(Flight flight){
        String flightNo = flight.getFlightNo();
        LocalDateTime departureTime = flight.getDepartureTime();
        LocalDateTime arrivalTime = flight.getArrivalTime();
        int departure = flightRepository.countByFlightNoAndDepartureTime(flightNo,departureTime);
        int arrival = flightRepository.countByFlightNoAndArrivalTime(flightNo,arrivalTime);
        return (departure>1||arrival>1);
    }
}
