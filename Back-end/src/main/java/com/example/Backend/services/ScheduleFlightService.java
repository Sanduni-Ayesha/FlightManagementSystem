package com.example.Backend.services;

import com.example.Backend.daoImpl.FlightDaoImpl;
import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.dtoMapper.FlightSchedulerMapper;
import com.example.Backend.exceptions.Exceptions;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Flight;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.FlightRepository;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ScheduleFlightService {
    private FlightDaoImpl flightDaoImpl;
    private FlightRepository flightRepository;
    private RouteRepository routeRepository;

    @Autowired
    public ScheduleFlightService(FlightDaoImpl flightDaoImpl, FlightRepository flightRepository, RouteRepository routeRepository) {
        this.flightDaoImpl = flightDaoImpl;
        this.flightRepository = flightRepository;
        this.routeRepository = routeRepository;
    }

    @Transactional(rollbackFor = Exceptions.class)
    public FlightDto createSchedule(ScheduleFlightDto scheduleFlightDto) {
        if (!scheduleFlightDto.validateScheduleFlight()) {
            throw new Exceptions(ResponseStatusCodes.SCHEDULE_DATA_INVALID);
        }
        if (!routeRepository.existsRouteByArrivalAirportAndDepartureAirportAndStatus
                (scheduleFlightDto.getArrivalAirport(), scheduleFlightDto.getDepartureAirport(), Route.Status.active)) {
            throw new Exceptions(ResponseStatusCodes.ROUTE_NOT_EXISTS_EXCEPTION);
        }
        Flight dulicateFlight = checkFlightDuplicates(scheduleFlightDto);
        if (dulicateFlight != null) {
            return new FlightDto(dulicateFlight);
        }
        List<Flight> flights = new FlightSchedulerMapper().convertScheduleFlightDtoToFlight(scheduleFlightDto);
        if(flights.size()==0){
            throw new Exceptions(ResponseStatusCodes.DATE_NOT_IN_RANGE_EXCEPTION);
        }
        flightRepository.saveAll(flights);
        return null;
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public Flight checkFlightDuplicates(ScheduleFlightDto scheduleFlightDto) {
        Flight duplicateFlight = flightDaoImpl.checkDuplicateByAllScheduleFlights(scheduleFlightDto);
        if (duplicateFlight == null) {
            return null;
        } else {
            return duplicateFlight;
        }
    }

}
