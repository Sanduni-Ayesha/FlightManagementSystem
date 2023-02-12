package com.example.Backend.services;

import com.example.Backend.daoImpl.RouteDaoImpl;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.exceptions.RouteNotFoundException;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.AirportRepository;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Backend.exceptions.Exceptions;
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
    public Route updateRoute(Route route) {
        if(!routeRepository.existsRouteByIdAndStatusEquals(route.getId(),Route.Status.active)){
            throw new Exceptions(ResponseStatusCodes.ROUTE_NOT_EXISTS_EXCEPTION);
        }
        if(!this.isValidRoute(route)){
            throw new Exceptions(ResponseStatusCodes.INVALID_ROUTE_EXCEPTION);
        }
        Route UpdatingRoute = routeRepository.findRouteById(route.getId());
        UpdatingRoute.setArrivalAirport(route.getArrivalAirport());
        UpdatingRoute.setDepartureAirport(route.getDepartureAirport());
        UpdatingRoute.setMileage(route.getMileage());
        UpdatingRoute.setDuration(route.getDuration());
        UpdatingRoute.setCreatedTime(route.getCreatedTime());
        UpdatingRoute.setLastUpdatedTime(route.getLastUpdatedTime());
        Route updatedRoute = routeRepository.save(UpdatingRoute);
        return updatedRoute ;
    }

    public Route addRoute(Route route){
        if(routeRepository.existsRouteByArrivalAirportAndDepartureAirportAndStatus(
                route.getArrivalAirport(),route.getDepartureAirport(),Route.Status.active)){
            throw new Exceptions(ResponseStatusCodes.ROUTE_EXISTS_EXCEPTION);
        }
        if(!this.isValidRoute(route)){
            throw new Exceptions(ResponseStatusCodes.INVALID_ROUTE_EXCEPTION);
        }
        return routeRepository.save(route);


    }
    public Route getRouteById(int id){
       return routeRepository.findById(id).orElseThrow(() -> new RouteNotFoundException("Route not found for this id :: " + id));
    }
    public Boolean isValidRoute(Route route){
        String airportPattern = "[A-Z]{3}";
        String floatPattern = "^[1-9]\\d*(\\.\\d+)?$";
        String integerPattern= "^[1-9]\\d*$";

        if(route.getDepartureAirport().matches(airportPattern) &&
           route.getArrivalAirport().matches(airportPattern) &&
           Double.toString(route.getMileage()).matches(floatPattern) &&
           Double.toString(route.getDuration()).matches(floatPattern) &&
           Integer.toString(route.getId()).matches(integerPattern) &&
            Long.toString(route.getVersion()).matches(integerPattern)
        ){
            return true;
        }
        else{
            return false;
        }
    }

}
