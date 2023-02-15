package com.example.Backend.services;

import com.example.Backend.daoImpl.FlightDaoImpl;
import com.example.Backend.exceptions.Exceptions;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlightService {

    private FlightRepository flightRepository;
    private FlightDaoImpl flightDaoImpl;
    public static Logger logger = LoggerFactory.getLogger(FlightDaoImpl.class);

    @Autowired
    public FlightService(FlightRepository flightRepository, FlightDaoImpl flightDaoImpl) {
        this.flightRepository = flightRepository;
        this.flightDaoImpl = flightDaoImpl;
    }

    public List<Flight> searchFlights(String departure, String arrival) {
        return flightDaoImpl.searchFlights(departure, arrival);
    }

    public Flight getFlightByID(int id) {
        return flightRepository.findById(id).orElseThrow(() -> new Exceptions(ResponseStatusCodes.FLIGHT_NOT_FOUND_EXCEPTION));
    }

    @Transactional
    public Flight deleteFlight(int id) {
        Flight flight = getFlightByID(id);
        flightRepository.delete(flight);
        return flight;
    }

    @Transactional
    public Flight addFlight(Flight flight) {
        if (!validateFlight(flight)) {
            logger.info("The entered flight data is invalid.");
            throw new Exceptions(ResponseStatusCodes.INVALID_FLIGHT_EXCEPTION);
        }
        if (checkFlightDuplicates(flight)) {
            logger.info("The flight cannot be added as the Flight is occupied in the given time");
            throw new Exceptions(ResponseStatusCodes.FLIGHT_EXISTS_EXCEPTION);
        }
        return flightRepository.save(flight);
    }

    @Transactional
    public Flight updateFlight(Flight fl) {
        Flight flight = getFlightByID(fl.getId());
        if (!validateFlight(fl)) {
            logger.info("The entered flight data is invalid.");
            throw new Exceptions(ResponseStatusCodes.INVALID_FLIGHT_EXCEPTION);
        }
        if (checkFlightDuplicates(fl)) {
            logger.info("The flight cannot be added as the Flight is occupied in the given time");
            throw new Exceptions(ResponseStatusCodes.FLIGHT_EXISTS_EXCEPTION);
        }

        if (fl.getVersion() == flight.getVersion()) {
            flight.setDepartureAirport(fl.getDepartureAirport());
            flight.setArrivalAirport(fl.getArrivalAirport());
            flight.setFlightNo(fl.getFlightNo());
            flight.setDepartureTime(fl.getDepartureTime());
            flight.setArrivalTime(fl.getArrivalTime());
            flight.setLastUpdatedTime(LocalDateTime.now());
            flight.setVersion(fl.getVersion() + 1);
            return flight;
        } else {
            logger.info("The selected flight is already updated by a user at " + flight.getLastUpdatedTime() + " .");
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

    public boolean checkFlightDuplicates(Flight flight) {
        String flightNo = flight.getFlightNo();
        LocalDateTime departureTime = flight.getDepartureTime();
        LocalDateTime arrivalTime = flight.getArrivalTime();
        return flightDaoImpl.checkDuplicate(flightNo, departureTime, arrivalTime);
    }
}
