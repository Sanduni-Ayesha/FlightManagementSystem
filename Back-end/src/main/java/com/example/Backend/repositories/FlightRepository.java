package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer> {
    int countByFlightNoAndDepartureTime(String flightNo, LocalDateTime departureTime);

    int countByFlightNoAndArrivalTime(String flightNo, LocalDateTime arrivalTime);
    boolean existsFlightByArrivalAirportAndDepartureAirport(String arrivalAirport,String departureAirport);

}

