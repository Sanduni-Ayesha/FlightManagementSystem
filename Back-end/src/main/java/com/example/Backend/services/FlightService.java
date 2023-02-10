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
        if (flight.getStatus().equals(Flight.Status.inactive)){
//            TODO already deleted exception
        }
        flight.setStatus(Flight.Status.inactive);
        flightRepository.save(flight);
    }

    public Flight addFlight(Flight flight) {
        boolean checkDeparture = checkFlightExistence(flight);
        boolean flightValidated = validateFlight(flight);
        if (checkDeparture) {
//            TODO throw flight exists exception
             return null;
        }
        if (!flightValidated) {
//            TODO throw flight validation unsuccessful exception
            return null;
        }
        return flightRepository.save(flight);
     }

    public Flight updateFlight(Flight fl) {
        Flight flight = getFlightByID(fl.getId());
        boolean checkDeparture = checkFlightExistence(fl);
        boolean flightValidated = validateFlight(fl);
        if (checkDeparture) {
//            TODO throw flight exists exception
            return null;
        }
        if (!flightValidated) {
//            TODO throw flight validation unsuccessful exception
            return null;
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
//            TODO throw flight already updated exception
        }
        return flight;

    }

    public boolean checkVersion(int currentVersion, int newVersion){
        return true;
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
        boolean departure = flightRepository.existsByFlightNoAndDepartureTime(flightNo,departureTime);
        boolean arrival = flightRepository.existsByFlightNoAndArrivalTime(flightNo,arrivalTime);
        return departure;
    }
}
