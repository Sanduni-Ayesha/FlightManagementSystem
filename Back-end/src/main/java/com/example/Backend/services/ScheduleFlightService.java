package com.example.Backend.services;

import com.example.Backend.daoImpl.FlightDaoImpl;
import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.dtoMapper.FlightMapper;
import com.example.Backend.dtoMapper.FlightSchedulerMapper;
import com.example.Backend.models.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Service
public class ScheduleFlightService {
    private FlightDaoImpl flightDaoImpl;
    @Autowired
    public ScheduleFlightService(FlightDaoImpl flightDaoImpl) {
        this.flightDaoImpl = flightDaoImpl;
    }

    @Transactional
    public ScheduleFlightDto createSchedule(ScheduleFlightDto scheduleFlightDto){
        FlightSchedulerMapper flightSchedulerMapper = new FlightSchedulerMapper();
        List<Flight> flights = flightSchedulerMapper.convertScheduleFlightDtoToFlight(scheduleFlightDto);
        for(Flight flight:flights){
            if(checkFlightDuplicates(FlightMapper.flightToFlightDtoMapper(flight))){

            }
        }
        return  scheduleFlightDto;
    }
    @Transactional(propagation = Propagation.MANDATORY)
    public boolean checkFlightDuplicates(FlightDto flightDto) {
        return flightDaoImpl.checkDuplicate(flightDto);
    }
}
