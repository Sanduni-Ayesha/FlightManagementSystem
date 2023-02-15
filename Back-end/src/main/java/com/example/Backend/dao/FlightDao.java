package com.example.Backend.dao;

import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightDao<T> {
    List<Flight> searchFlights(String departure, String arrival);
}
