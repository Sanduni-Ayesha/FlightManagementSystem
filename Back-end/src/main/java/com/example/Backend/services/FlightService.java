package com.example.Backend.services;

import com.example.Backend.daoImpl.FlightDaoImpl;
import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.dtoMapper.FlightMapper;
import com.example.Backend.exceptions.Exceptions;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;

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

    @Transactional
    public List<Flight> searchFlights(SearchDTO searchDTO) {
        return flightDaoImpl.searchFlights(searchDTO);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public Flight getFlightByID(int id) {
        return flightRepository.findById(id).orElseThrow(() -> new Exceptions(ResponseStatusCodes.FLIGHT_NOT_FOUND_EXCEPTION));
    }

    @Transactional(rollbackFor = Exceptions.class)
    public FlightDto deleteFlight(int id) {
        Flight flight = getFlightByID(id);
        flightRepository.delete(flight);
        return FlightMapper.flightToFlightDtoMapper(flight);
    }

    @Transactional(rollbackFor = Exceptions.class)
    public FlightDto addFlight(FlightDto flightDto) {
        if (!validateFlight(flightDto)) {
            logger.info("The entered flight data is invalid.");
            throw new Exceptions(ResponseStatusCodes.INVALID_FLIGHT_EXCEPTION);
        }
        if (checkFlightDuplicates(flightDto)) {
            logger.info("The flight cannot be added as the Flight is occupied in the given time");
            throw new Exceptions(ResponseStatusCodes.FLIGHT_EXISTS_EXCEPTION);
        }
        return FlightMapper.flightToFlightDtoMapper(flightRepository.save(FlightMapper.flightDtoToFlightMapper(flightDto)));
    }

    @Transactional(rollbackFor = Exceptions.class)
    public FlightDto updateFlight(FlightDto flightDto) {
        Flight flight = getFlightByID(flightDto.getId());
        if (!validateFlight(flightDto)) {
            logger.info("The entered flight data is invalid.");
            throw new Exceptions(ResponseStatusCodes.INVALID_FLIGHT_EXCEPTION);
        }
        if (checkFlightDuplicates(flightDto)) {
            logger.info("The flight cannot be added as the Flight is occupied in the given time");
            throw new Exceptions(ResponseStatusCodes.FLIGHT_EXISTS_EXCEPTION);
        }

        if (flightDto.getVersion() == flight.getVersion()) {
            flight = flight.updateFlight(flight, flightDto);
            return FlightMapper.flightToFlightDtoMapper(flight);
        } else {
            logger.info("The selected flight is already updated by a user at " + flight.getLastUpdatedTime() + " .");
            throw new Exceptions(ResponseStatusCodes.FLIGHT_ALREADY_UPDATED_EXCEPTION);
        }
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public boolean validateFlight(FlightDto flightDto) {
        if (flightDto.getDepartureAirport().matches("[A-Z]{3}") &&
                flightDto.getArrivalAirport().matches("[A-Z]{3}") &&
                flightDto.getFlightNo().matches("[A-Za-z]{2}[0-9]{4}") &&
                flightDto.getDepartureTime().isAfter(LocalDateTime.now()) &&
                flightDto.getArrivalTime().isBefore(flightDto.getArrivalTime())) {
            return true;
        }
        return false;
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public boolean checkFlightDuplicates(FlightDto flightDto) {
        return flightDaoImpl.checkDuplicate(flightDto);
    }
}
