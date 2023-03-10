package com.example.Backend.services;

import com.example.Backend.daoImpl.FlightDaoImpl;
import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.dto.SearchFlightDto;
import com.example.Backend.exceptions.Exceptions;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Flight;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.FlightRepository;

import com.example.Backend.repositories.RouteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;

import java.util.List;

@Service
public class FlightService {

    private FlightRepository flightRepository;
    private FlightDaoImpl flightDaoImpl;
    private RouteRepository routeRepository;
    public static Logger logger = LoggerFactory.getLogger(FlightDaoImpl.class);

    @Autowired
    public FlightService(FlightRepository flightRepository, FlightDaoImpl flightDaoImpl, RouteRepository routeRepository) {
        this.flightRepository = flightRepository;
        this.flightDaoImpl = flightDaoImpl;
        this.routeRepository = routeRepository;
    }

    public List<Flight> searchFlights(SearchFlightDto searchFlightDto) {
        return flightDaoImpl.searchFlights(searchFlightDto);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public Flight getFlightByID(int id) {
        return flightRepository.findById(id).orElseThrow(() -> new Exceptions(ResponseStatusCodes.FLIGHT_NOT_FOUND_EXCEPTION));
    }

    @Transactional
    public FlightDto deleteFlight(int id) {
        Flight flight = getFlightByID(id);
        flightRepository.delete(flight);
        return new FlightDto(flight);
    }

    @Transactional
    public FlightDto addFlight(FlightDto flightDto) {
        flightValidations(flightDto);
        return new FlightDto(flightRepository.save(new Flight(flightDto)));
    }

    @Transactional
    public FlightDto updateFlight(FlightDto flightDto) {
        Flight flight = getFlightByID(flightDto.getId());
        flightValidations(flightDto);
        if (flightDto.getVersion() == flight.getVersion()) {
            flight = flight.updateFlight(flightDto);
            return new FlightDto(flight);
        } else {
            logger.info("The selected flight is already updated by a user at " + flight.getLastUpdatedTime() + " .");
            throw new Exceptions(ResponseStatusCodes.FLIGHT_ALREADY_UPDATED_EXCEPTION);
        }
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public boolean checkFlightDuplicates(FlightDto flightDto) {
        return flightDaoImpl.checkDuplicate(flightDto);
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void flightValidations(FlightDto flightDto) {
        if (!flightDto.validateFlight()) {
            logger.info("The entered flight data is invalid.");
            throw new Exceptions(ResponseStatusCodes.INVALID_FLIGHT_EXCEPTION);
        }
        if (checkFlightDuplicates(flightDto)) {
            logger.info("The flight cannot be added as the Flight is occupied in the given time");
            throw new Exceptions(ResponseStatusCodes.FLIGHT_EXISTS_EXCEPTION);
        }
        if (!routeRepository.existsRouteByArrivalAirportAndDepartureAirportAndStatus(flightDto.getArrivalAirport(), flightDto.getDepartureAirport(), Route.Status.active)) {
            logger.info("The flight cannot be added as the given route does not exist");
            throw new Exceptions(ResponseStatusCodes.ROUTE_NOT_EXISTS_EXCEPTION);
        }
    }
}
