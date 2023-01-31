package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FlightRepository {

    private List<Flight> flights = new ArrayList<Flight>();

    public FlightRepository(){
        flights.add(new Flight(1, "Honiara International Airport", "Maputo Airport", "AB2001", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(2, "Frankfurt Airport", "Dublin Airport ", "OK8798", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(3, "Hannover Airport", "Gran Canaria Airport", "PL8574", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(4, "Manchester Airport", "Tenerife Sur Airport", "YU3782", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(5, "Cape Town International Airport", "Tenerife Sur Airport", "TY8822", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(6, "Ivato Airport", "Sofia Airport", "KM8933", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(7, "Honiara International Airport", "Ibiza Airport", "GT6775", "2023-01-28T12:12", "2023-01-30T12:12"));
    }

    public List<Flight> getFlights(){
        return flights;
    }
}
