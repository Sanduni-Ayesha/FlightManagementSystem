package com.example.Backend.repositories;

import com.example.Backend.models.Flight;

import java.util.List;

public interface FlightRepositoryInterface{
    public List<Flight> getFlights();
    public List<Flight> getFlightsFilteredByAirport(String departureAirport, String arrivalAirport);
    public Flight getFlightByID(int id);
    public boolean deleteFlight(int id);
    public Flight addFlight(Flight flight);
    public Flight updateFlight(Flight fl);
}
