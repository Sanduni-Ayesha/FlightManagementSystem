package com.example.Backend.services;

import com.example.Backend.daoImpl.FlightDaoImpl;
import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.dtoMapper.FlightMapper;
import com.example.Backend.dtoMapper.FlightSchedulerMapper;
import com.example.Backend.exceptions.Exceptions;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class ScheduleFlightService {
    private FlightDaoImpl flightDaoImpl;
    private FlightRepository flightRepository;
    @Autowired
    public ScheduleFlightService(FlightDaoImpl flightDaoImpl, FlightRepository flightRepository) {
        this.flightDaoImpl = flightDaoImpl;
        this.flightRepository=flightRepository;
    }

    @Transactional(rollbackFor = Exceptions.class)
    public ScheduleFlightDto createSchedule(ScheduleFlightDto scheduleFlightDto){
        if(!validateScheduleFlight(scheduleFlightDto)){
            throw new Exceptions(ResponseStatusCodes.SCHEDULE_DATA_INVALID);
        }
        FlightSchedulerMapper flightSchedulerMapper = new FlightSchedulerMapper();
        List<Flight> flights = flightSchedulerMapper.convertScheduleFlightDtoToFlight(scheduleFlightDto);
//        for(Flight flight:flights){
//            if(checkFlightDuplicates(FlightMapper.flightToFlightDtoMapper(flight))){
//                System.out.println("done");
//            }
//        }
        flightRepository.saveAll(flights);
        return scheduleFlightDto;
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public boolean checkFlightDuplicates(FlightDto flightDto) {
        return flightRepository.existsFlightByFlightNoAndArrivalTimeIsLikeAndDepartureTimeIsLike(
                flightDto.getFlightNo(),flightDto.getArrivalTime(),
                flightDto.getDepartureTime()
        );
    }
    @Transactional(propagation = Propagation.MANDATORY)
    public boolean validateScheduleFlight(ScheduleFlightDto scheduleFlightDto) {
        if (scheduleFlightDto.getDepartureAirport().matches("[A-Z]{3}") &&
                scheduleFlightDto.getArrivalAirport().matches("[A-Z]{3}") &&
                scheduleFlightDto.getFlightNo().matches("[A-Za-z]{2}[0-9]{4}") &&
                scheduleFlightDto.getArrivalTime()!= scheduleFlightDto.getDepartureTime()
        ) {
            return true;
        }
        return false;
    }

}
