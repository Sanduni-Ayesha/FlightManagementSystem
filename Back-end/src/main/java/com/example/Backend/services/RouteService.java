package com.example.Backend.services;

import com.example.Backend.daoImpl.RouteDaoImpl;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.AirportRepository;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        this.airportRepository = airportRepository;
        this.routeDaoImpl = routeDaoImpl;
    }

    public List<Route> getRoutes(String departureAirport, String arrivalAirport) {
        return routeDaoImpl.searchRoute(departureAirport, arrivalAirport);
    }


    public Route deleteRoute(int id) {
        if (!routeRepository.existsRouteByIdAndStatus(id, Route.Status.active)) {
            throw new Exceptions(ResponseStatusCodes.ROUTE_EXISTS_EXCEPTION);
        }
        ;
        Route route = this.routeRepository.findRouteById(id);
        route.setStatus(Route.Status.inactive);
        return routeRepository.save(route);

    }

    public Route updateRoute(Route route) {
        if (!routeRepository.existsRouteByIdAndStatus(route.getId(), Route.Status.active)) {
            throw new Exceptions(ResponseStatusCodes.ROUTE_NOT_EXISTS_EXCEPTION);
        }
        if (!this.isValidRoute(route)) {
            throw new Exceptions(ResponseStatusCodes.INVALID_ROUTE_EXCEPTION);
        }

        Route UpdatingRoute = routeRepository.findRouteById(route.getId());
        if (!UpdatingRoute.getVersion().equals(route.getVersion())) {
            throw new Exceptions(ResponseStatusCodes.ROUTE_ALREADY_UPDATED_EXCEPTION);
        }
        UpdatingRoute.setArrivalAirport(route.getArrivalAirport());
        UpdatingRoute.setDepartureAirport(route.getDepartureAirport());
        UpdatingRoute.setMileage(route.getMileage());
        UpdatingRoute.setDuration(route.getDuration());
        UpdatingRoute.setCreatedTime(route.getCreatedTime());
        UpdatingRoute.setLastUpdatedTime(route.getLastUpdatedTime());
        Route updatedRoute = routeRepository.save(UpdatingRoute);
        return updatedRoute;
    }

    public Route addRoute(Route route) {
        if (routeRepository.existsRouteByArrivalAirportAndDepartureAirportAndStatus(
                route.getArrivalAirport(), route.getDepartureAirport(), Route.Status.active)) {
            throw new Exceptions(ResponseStatusCodes.ROUTE_EXISTS_EXCEPTION);
        }
        if (!this.isValidRoute(route)) {
            throw new Exceptions(ResponseStatusCodes.INVALID_ROUTE_EXCEPTION);
        }
        return routeRepository.save(route);


    }

    public Boolean isValidRoute(Route route) {
        String airportPattern = "[A-Z]{3}";
        String floatPattern = "^[1-9]\\d*(\\.\\d+)?$";

        if (route.getDepartureAirport().matches(airportPattern) &&
                route.getArrivalAirport().matches(airportPattern) &&
                Double.toString(route.getMileage()).matches(floatPattern) &&
                Double.toString(route.getDuration()).matches(floatPattern)
        ) {
            return true;
        } else {
            return false;
        }
    }

}
