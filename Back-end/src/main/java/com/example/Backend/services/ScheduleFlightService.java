package com.example.Backend.services;

import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.dtoMapper.FlightSchedulerMapper;
import com.example.Backend.models.Flight;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ScheduleFlightService {
    public ScheduleFlightDto createSchedule(ScheduleFlightDto scheduleFlightDto){
        FlightSchedulerMapper flightSchedulerMapper = new FlightSchedulerMapper();
        List<Flight> flights = flightSchedulerMapper.convertScheduleFlightDtoToFlight(scheduleFlightDto);
        for(Flight f:flights){
            System.out.println(f.getDepartureTime());
            System.out.println(f.getArrivalTime());
            System.out.println("==================");
        }
        return  scheduleFlightDto;
    }
}
