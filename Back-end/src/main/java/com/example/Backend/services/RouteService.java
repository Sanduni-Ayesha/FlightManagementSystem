package com.example.Backend.services;

import com.example.Backend.daoImpl.FlightDaoImpl;
import com.example.Backend.daoImpl.RouteDaoImpl;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.AirportRepository;
import com.example.Backend.repositories.RouteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.exceptions.Exceptions;

import java.util.List;

@Service
public class RouteService {
    private AirportRepository airportRepository;
    private RouteRepository routeRepository;
    private RouteDaoImpl routeDaoImpl;
    public static Logger logger = LoggerFactory.getLogger(RouteDaoImpl.class);

    @Autowired
    public RouteService(RouteRepository routeRepositoryInterface,
                        AirportRepository airportRepository,
                        RouteDaoImpl routeDaoImpl) {
        this.routeRepository = routeRepositoryInterface;
        this.airportRepository = airportRepository;
        this.routeDaoImpl = routeDaoImpl;
    }

    public List<Route> getRoutes(String departureAirport, String arrivalAirport) {
        if (!departureAirport.isEmpty() && !arrivalAirport.isEmpty() && departureAirport.equals(arrivalAirport)) {
            logger.error("This route with departure airport code " + departureAirport +
                    " arrival airport " + arrivalAirport + "are same");
            throw new Exceptions(ResponseStatusCodes.DEPARTURE_AIRPORT_AND_ARRIVAL_AIRPORT_SAME_EXCEPTION);
        }
        return routeDaoImpl.searchRoute(departureAirport, arrivalAirport);
    }


    public Route deleteRoute(int id) {
        if (routeRepository.existsRouteByIdAndStatus(id, Route.Status.inactive)) {
            logger.error("The route with id " + id + " is already deleted.");
            throw new Exceptions(ResponseStatusCodes.ROUTE_EXISTS_EXCEPTION);
        }
        Route route = this.routeRepository.findRouteById(id);
        route.setStatus(Route.Status.inactive);
        return routeRepository.save(route);

    }

    public Route updateRoute(Route route) {
        if (!routeRepository.existsRouteByIdAndStatus(route.getId(), Route.Status.active)) {
            logger.error("The the route with" + route.getId() + "not exist");
            throw new Exceptions(ResponseStatusCodes.ROUTE_NOT_EXISTS_EXCEPTION);
        }
        if (!isValidRoute(route)) {
            logger.error("This input route date with id" + route.getId() + "have invalid inputs");
            throw new Exceptions(ResponseStatusCodes.INVALID_ROUTE_EXCEPTION);
        }

        Route UpdatingRoute = routeRepository.findRouteById(route.getId());
        if (!UpdatingRoute.getVersion().equals(route.getVersion())) {
            logger.error("This input route detail's version is upto date");
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
            logger.error("This input route date with departure code " + route.getDepartureAirport() +
                    " arrival code " + route.getArrivalAirport() + " already exist");
            throw new Exceptions(ResponseStatusCodes.ROUTE_EXISTS_EXCEPTION);
        }
        if (!this.isValidRoute(route)) {
            logger.error("This input route date with id " + route.getId() + " have invalid inputs");
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
