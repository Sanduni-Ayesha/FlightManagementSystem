package com.example.Backend.services;

import com.example.Backend.daoImpl.RouteDaoImpl;
import com.example.Backend.exceptions.RouteNotFoundException;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.AirportRepository;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {
    private AirportRepository airportRepository;
    private RouteRepository routeRepository;
    private RouteDaoImpl routeDaoImpl;
    @Autowired
    public RouteService(RouteRepository routeRepositoryInterface,
                        AirportRepository airportRepository,
                        RouteDaoImpl routeDaoImpl) {
        this.routeRepository = routeRepositoryInterface;
        this.airportRepository=airportRepository;
        this.routeDaoImpl = routeDaoImpl;
    }
    public List<Route> getRoutes(String departureAirport, String arrivalAirport){
       return routeDaoImpl.searchRoute(departureAirport,arrivalAirport);
    }


    public ResponseEntity<HttpStatus> deleteRoute(int id){
            Route route = routeRepository.findById(id).orElseThrow(() -> new RouteNotFoundException("Route not found for this id :: " + id));
            route.setStatus(Route.Status.inactive);
            routeRepository.save(route);
            return new ResponseEntity<>(HttpStatus.OK);

    }
    public ResponseEntity<Route> updateRoute(Route route){
        Route UpdatingRoute = routeRepository.findById(route.getId())
                .orElseThrow(() -> new RouteNotFoundException("Route not found for this id :: " + route.getId()));
        UpdatingRoute.setArrivalAirport(route.getArrivalAirport());
        UpdatingRoute.setDepartureAirport(route.getDepartureAirport());
        UpdatingRoute.setMileage(route.getMileage());
        UpdatingRoute.setDuration(route.getDuration());
        UpdatingRoute.setCreatedTime(route.getCreatedTime());
        UpdatingRoute.setLastUpdatedTime(route.getLastUpdatedTime());
        Route updatedRoute = routeRepository.save(UpdatingRoute);
        return ResponseEntity.ok(updatedRoute);
    }

    public ResponseEntity<Route> addRoute(Route route){
        return ResponseEntity.ok(routeRepository.save(route));
    }
    public Route getRouteById(int id){
       return routeRepository.findById(id).orElseThrow(() -> new RouteNotFoundException("Route not found for this id :: " + id));
    }

}
