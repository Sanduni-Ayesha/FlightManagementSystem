package com.example.Backend.services;

import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightRepository;
import com.example.Backend.repositories.FlightRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FlightServices {
    private final FlightRepositoryInterface repositoryInterface;
    @Autowired
    public FlightServices(FlightRepositoryInterface repositoryInterface) {
        this.repositoryInterface = repositoryInterface;
    }

    public Iterable<Flight> getFlights(){
        return repositoryInterface.findAll();
    }
    public Flight getFlightByID(int id){
        return repositoryInterface.findById(id).orElse(null);
    }

    public List<Flight> getFlightsFilteredByAirport(String departureAirport, String arrivalAirport){
        //return flightRepository.getFlightsFilteredByAirport(departureAirport, arrivalAirport);
        //TODO
        return new ArrayList<Flight>();
    }

    public void deleteFlight(int id){
        //TODO: set status inactive
        Flight flight = getFlightByID(id);
        flight.setStatus(Flight.Status.inactive);
        repositoryInterface.save(flight);
        //repositoryInterface.deleteById(id);
    }

    public Flight addFlight(Flight flight){
        return repositoryInterface.save(flight);
    }

    public Flight updateFlight(Flight fl){
        Flight flight = getFlightByID(fl.getId());
        flight.setDepartureAirport(fl.getDepartureAirport());
        flight.setArrivalAirport(fl.getArrivalAirport());
        flight.setFlightNo(fl.getFlightNo());
        flight.setDepartureTime(fl.getDepartureTime());
        flight.setArrivalTime(fl.getArrivalTime());
        flight.setLastUpdatedTime(LocalDateTime.now());
        flight.setVersion(fl.getVersion()+1);
        return repositoryInterface.save(flight);
    }

    public boolean checkData(Flight flight){
        String departureAirport = flight.getDepartureAirport();
        String arrivalAirport = flight.getArrivalAirport();
        String flightNo = flight.getFlightNo();
        LocalDateTime departureTime = flight.getDepartureTime();
        LocalDateTime arrivalTime = flight.getArrivalTime();

        if (departureAirport.matches("[A-Z]{3}") &&
                arrivalAirport.matches("[A-Z]{3}") &&
                flightNo.matches("[A-Za-z]{2}[0-9]{4}") &&
                departureTime.isAfter(LocalDateTime.now()) &&
                departureTime.isBefore(arrivalTime)){
            return true;
        }
        return false;
    }
}
