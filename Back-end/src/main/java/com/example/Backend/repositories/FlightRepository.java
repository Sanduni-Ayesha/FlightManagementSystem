package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FlightRepository implements FlightRepositoryInterface{

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
    @Override
    public List<Flight> getFlights(){
        return flights;
    }
    @Override
    public List<Flight> getFlightsFilteredByAirport(String departureAirport, String arrivalAirport){
        List<Flight> filteredFlights = new ArrayList<Flight>();
        List<Flight> singleAirportFilteredFLights = new ArrayList<>();
        if (departureAirport=="" && arrivalAirport=="") {
            return flights;
        }
        for (Flight flight:flights) {
            if (flight.getDepartureAirport()==departureAirport && flight.getArrivalAirport()==arrivalAirport){
                filteredFlights.add(flight);
            } else if(flight.getDepartureAirport()==departureAirport || flight.getArrivalAirport()==arrivalAirport){
                singleAirportFilteredFLights.add(flight);
            }
        }
        if (filteredFlights.isEmpty()){
            return singleAirportFilteredFLights;
        }
        return filteredFlights;
    }
    @Override
    public Flight getFlightByID(int id){
        for (Flight flight:flights) {
            if (flight.getId()==id){
                return flight;
            }
        }
        return null;
    }
    @Override
    public boolean deleteFlight(int id){
        return flights.removeIf(f->f.getId() == id);
    }
    @Override
    public Flight addFlight(Flight flight){
        flights.add(flight);
        return flight;
    }
    @Override
    public Flight updateFlight(Flight fl){
        Integer id = fl.getId();
        Flight flight = getFlightByID(id);
        flight.setDepartureAirport(fl.getDepartureAirport());
        flight.setArrivalAirport(fl.getArrivalAirport());
        flight.setFlightNo(fl.getFlightNo());
        flight.setArrivalTime(fl.getArrivalTime());
        flight.setDepartureTime(fl.getDepartureTime());
        return flight;
    }
}
