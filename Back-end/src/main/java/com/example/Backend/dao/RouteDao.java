package com.example.Backend.dao;

import java.util.List;
import com.example.Backend.models.Route;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteDao<T> {
    List<Route> searchRoute(String departureAirport,String arrivalAirport);

}
