package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FlightRepository{

    private List<Flight> flights = new ArrayList<Flight>();

    public FlightRepository(){}

    public List<Flight> getFlights(){
        return flights;
    }

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

    public Flight getFlightByID(int id){
        for (Flight flight:flights) {
            if (flight.getId()==id){
                return flight;
            }
        }
        return null;
    }

    public boolean deleteFlight(int id){
        return flights.removeIf(f->f.getId() == id);
    }

    public Flight addFlight(Flight flight){
        flights.add(flight);
        return flight;
    }

    public Flight updateFlight(Flight fl){
        Integer id = fl.getId();
        Flight flight = getFlightByID(id);
        flight.setDepartureAirport(fl.getDepartureAirport());
        flight.setArrivalAirport(fl.getArrivalAirport());
        flight.setFlightNo(fl.getFlightNo());
       /* flight.setArrivalTime(fl.getArrivalTime());
        flight.setDepartureTime(fl.getDepartureTime());*/
        return flight;
    }
}
