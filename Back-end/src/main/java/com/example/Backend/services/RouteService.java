package com.example.Backend.services;

import com.example.Backend.daoImpl.RouteDaoImpl;
import com.example.Backend.dto.RouteDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.exceptions.ResponseStatusCodes;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.FlightRepository;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.exceptions.Exceptions;

import java.util.List;

@Service
public class RouteService {
    private RouteRepository routeRepository;
    private RouteDaoImpl routeDaoImpl;
    private FlightRepository flightRepository;
    public static Logger logger = LoggerFactory.getLogger(RouteDaoImpl.class);

    @Autowired
    public RouteService(RouteRepository routeRepositoryInterface,
                        RouteDaoImpl routeDaoImpl,
                        FlightRepository flightRepository) {
        this.routeRepository = routeRepositoryInterface;
        this.routeDaoImpl = routeDaoImpl;
        this.flightRepository = flightRepository;
    }

    public List<Route> getRoutes(SearchDTO searchDTO) {
        return routeDaoImpl.searchRoute(searchDTO);
    }

    @Transactional(rollbackFor = Exceptions.class)
    public int deleteRoute(int id) {
        Route route = routeRepository.findRouteById(id);
        if (route == null) {
            logger.info("The route with id " + id + " is not available");
            throw new Exceptions(ResponseStatusCodes.ROUTE_NOT_EXISTS_EXCEPTION);
        }
        if (route.getStatus() == Route.Status.inactive) {
            logger.info("The route with id " + id + " is already in inactive state and it can not be deleted.");
            throw new Exceptions(ResponseStatusCodes.ROUTE_ALREADY_IN_INACTIVE_STATE_EXCEPTION);
        }
        if (flightRepository.existsFlightByArrivalAirportAndDepartureAirport(
                route.getArrivalAirport(), route.getDepartureAirport())) {
            route.setStatus(Route.Status.inactive);
            return id;
        }
        routeRepository.deleteById(id);
        return id;
    }

    @Transactional(rollbackFor = Exceptions.class)
    public RouteDto updateRoute(RouteDto routeDto) {
        if (!routeDto.isValidRoute()) {
            logger.error("This input route date with id " + routeDto.getId() + " have invalid inputs");
            throw new Exceptions(ResponseStatusCodes.INVALID_ROUTE_EXCEPTION);
        }
        if (!routeRepository.existsRouteByIdAndStatus(routeDto.getId(), Route.Status.active)) {
            logger.error("The the route with" + routeDto.getId() + "not exist");
            throw new Exceptions(ResponseStatusCodes.ROUTE_NOT_EXISTS_EXCEPTION);
        }
        Route toBeUpdatedRoute = routeRepository.findRouteById(routeDto.getId());
        if (!toBeUpdatedRoute.getVersion().equals(routeDto.getVersion())) {
            logger.error("The selected route is already updated at " + toBeUpdatedRoute.getLastUpdatedTime() + " .");
            throw new Exceptions(ResponseStatusCodes.ROUTE_ALREADY_UPDATED_EXCEPTION);
        }
        toBeUpdatedRoute.routeUpdate(routeDto);
        return new RouteDto(toBeUpdatedRoute);

    }

    @Transactional(rollbackFor = Exceptions.class)
    public RouteDto addRoute(RouteDto routeDto) {
        if (!routeDto.isValidRoute()) {
            logger.error("This input route date with id " + routeDto.getId() + " have invalid inputs");
            throw new Exceptions(ResponseStatusCodes.INVALID_ROUTE_EXCEPTION);
        }
        if (routeRepository.existsRouteByArrivalAirportAndDepartureAirportAndStatus(
                routeDto.getArrivalAirport(), routeDto.getDepartureAirport(), Route.Status.active)) {
            logger.info("This input route date with id " + routeDto.getId() + " have invalid inputs");
            throw new Exceptions(ResponseStatusCodes.ROUTE_EXISTS_EXCEPTION);
        }
        if (routeRepository.existsRouteByArrivalAirportAndDepartureAirportAndStatus(
                routeDto.getArrivalAirport(), routeDto.getDepartureAirport(), Route.Status.inactive)) {
            return setActivateAlreadyExistRoute(routeDto);
        }
        Route route = new Route(routeDto);
        return new RouteDto(routeRepository.save(route));
    }

    public RouteDto setActivateAlreadyExistRoute(RouteDto routeDto) {
        Route route = routeRepository.findRouteByArrivalAirportAndDepartureAirport
                (routeDto.getArrivalAirport(), routeDto.getDepartureAirport());
        route.setStatus(Route.Status.active);
        route.setLastUpdatedTime(routeDto.getCreatedTime());
        route.setMileage(routeDto.getMileage());
        route.setDuration(routeDto.getDuration());
        return new RouteDto(route);
    }

}
