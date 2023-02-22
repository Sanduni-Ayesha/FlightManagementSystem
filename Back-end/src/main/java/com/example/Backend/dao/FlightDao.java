package com.example.Backend.dao;

import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.dto.SearchFlightDto;
import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightDao<T> {
    List<Flight> searchFlights(SearchFlightDto searchFlightDto);

    boolean checkDuplicate(FlightDto flightDto);

    Flight checkDuplicateByAllScheduleFlights(ScheduleFlightDto scheduleFlightDto);
}
