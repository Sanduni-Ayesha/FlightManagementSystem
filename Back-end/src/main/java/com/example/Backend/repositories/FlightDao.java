package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FlightDao<T>{
    List<Flight> getFlights();
}
