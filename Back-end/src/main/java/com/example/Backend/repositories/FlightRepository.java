package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FlightRepository {

    private List<Flight> flights = new ArrayList<Flight>();

    public FlightRepository(){
        flights.add(new Flight(1, "Honiara International Airport", "Dublin Airport ", "AB2001 ", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(2, "Honiara International Airport", "Dublin Airport ", "AB2001 ", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(3, "Honiara International Airport", "Dublin Airport ", "AB2001 ", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(4, "Honiara International Airport", "Dublin Airport ", "AB2001 ", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(5, "Honiara International Airport", "Dublin Airport ", "AB2001 ", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(6, "Honiara International Airport", "Dublin Airport ", "AB2001 ", "2023-01-28T12:12", "2023-01-30T12:12"));
        flights.add(new Flight(7, "Honiara International Airport", "Dublin Airport ", "AB2001 ", "2023-01-28T12:12", "2023-01-30T12:12"));
    }

    public List<Flight> getFlights(){
        return flights;
    }
}
