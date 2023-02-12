package com.example.Backend.repositories;

import com.example.Backend.models.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route,Integer> {
    Route findRouteById(int id);
    Boolean existsRouteByArrivalAirportAndDepartureAirportAndStatus(String arrivalAirport,String departureAirport,Route.Status status);
    Boolean existsRouteByIdAndStatusEquals(int id,Route.Status status);
}
