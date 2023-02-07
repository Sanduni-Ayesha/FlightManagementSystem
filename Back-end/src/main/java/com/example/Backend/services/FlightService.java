package com.example.Backend.services;

import com.example.Backend.models.Airport;
import com.example.Backend.models.Flight;
import com.example.Backend.repositories.AirportRepository;
import com.example.Backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FlightService {

    private FlightRepository flightRepository;
    private AirportRepository airportRepository;
    @Autowired
    public FlightService(FlightRepository flightRepository, AirportRepository airportRepository) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
    }

    public List<Flight> getFlights() {
        Iterable<Flight> allFlights = flightRepository.findAll();
        List<Flight> activeFlights = new ArrayList<>();
        for (Flight fl: allFlights) {
            if (fl.getStatus()== Flight.Status.active){
                fl.setDepartureAirport(getAirportName(fl.getDepartureAirport()));
                fl.setArrivalAirport(getAirportName(fl.getArrivalAirport()));
                activeFlights.add(fl);
            }
        }
        return activeFlights;
    }

    public String getAirportName(String code){
        Airport airport =  airportRepository.findById(code).orElse(null);
        return airport.getAirport_name();
    }

    public Flight getFlightByID(int id) {
        return flightRepository.findById(id).orElse(null);
    }

    public List<Flight> getFlightsFilteredByAirport(String departureAirport, String arrivalAirport) {
        //return flightRepository.getFlightsFilteredByAirport(departureAirport, arrivalAirport);
        //TODO
        return new ArrayList<Flight>();
    }

    public void deleteFlight(int id) {
        Flight flight = getFlightByID(id);
        flight.setStatus(Flight.Status.inactive);
        flightRepository.save(flight);
    }

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
     }

    public Flight updateFlight(Flight fl) {
        Flight flight = getFlightByID(fl.getId());
        flight.setDepartureAirport(fl.getDepartureAirport());
        flight.setArrivalAirport(fl.getArrivalAirport());
        flight.setFlightNo(fl.getFlightNo());
        flight.setDepartureTime(fl.getDepartureTime());
        flight.setArrivalTime(fl.getArrivalTime());
        flight.setLastUpdatedTime(LocalDateTime.now());
        flight.setVersion(fl.getVersion() + 1);
        return flightRepository.save(flight);
    }

    public boolean checkData(Flight flight) {
        String departureAirport = flight.getDepartureAirport();
        String arrivalAirport = flight.getArrivalAirport();
        String flightNo = flight.getFlightNo();
        LocalDateTime departureTime = flight.getDepartureTime();
        LocalDateTime arrivalTime = flight.getArrivalTime();

        if (departureAirport.matches("[A-Z]{3}") &&
                arrivalAirport.matches("[A-Z]{3}") &&
                flightNo.matches("[A-Za-z]{2}[0-9]{4}") &&
                departureTime.isAfter(LocalDateTime.now()) &&
                departureTime.isBefore(arrivalTime)) {
            return true;
        }
        return false;
    }
}
