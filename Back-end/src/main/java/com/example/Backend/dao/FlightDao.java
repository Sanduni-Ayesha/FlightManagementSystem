package com.example.Backend.dao;

import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightDao<T> {
    List<Flight> searchFlights(SearchDTO searchDTO);

    boolean checkDuplicate(FlightDto flightDto);
}
