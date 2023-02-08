package com.example.Backend.services;

import com.example.Backend.exceptions.RouteNotFoundException;
import com.example.Backend.models.Airport;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.AirportRepository;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RouteService {
    private AirportRepository airportRepository;
    private JdbcTemplate routeDetails;
    private JdbcTemplate airportDetails;
    private RouteRepository routeRepository;
    @Autowired
    public RouteService(RouteRepository routeRepositoryInterface, JdbcTemplate routeDetails,AirportRepository airportRepository) {
        this.routeRepository = routeRepositoryInterface;
        this.routeDetails= routeDetails;
        this.airportRepository=airportRepository;
    }
    public List<Route> getAllRoutes(){
        String query = "Select * from route";
       List<Route> allRoutes=(this.routeDetails.query(query, BeanPropertyRowMapper.newInstance(Route.class)));
       List<Route> activateRoute = new ArrayList<>();
       for(Route route:allRoutes){
           if(route.getStatus() == Route.Status.active){
               route.setArrivalAirport(getAirportNameByAirportCode(route.getArrivalAirport()));
               route.setDepartureAirport(getAirportNameByAirportCode(route.getDepartureAirport()));
               activateRoute.add(route);
           }
       }
       return activateRoute;
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
        for(Airport airport:getAirportCodesByAirportNames(route.getDepartureAirport(),route.getArrivalAirport())){
            if(route.getArrivalAirport()==airport.getAirport_name()){
                UpdatingRoute.setArrivalAirport(airport.getAirport_name());
            }
            if(route.getDepartureAirport() == airport.getAirport_name()){
                UpdatingRoute.setArrivalAirport(airport.getAirport_name());
            }
        }
        UpdatingRoute.setMileage(route.getMileage());
        UpdatingRoute.setDuration(route.getDuration());
        UpdatingRoute.setCreatedTime(route.getCreatedTime());
        UpdatingRoute.setLastUpdatedTime(route.getLastUpdatedTime());
        Route updatedRoute = routeRepository.save(UpdatingRoute);
        return ResponseEntity.ok(updatedRoute);
    }

    public ResponseEntity<Route> addRoute(Route route){
        route.setId(5);
        return ResponseEntity.ok(routeRepository.save(route));
    }
    public Route getRouteById(int id){
       return routeRepository.findById(id).orElseThrow(() -> new RouteNotFoundException("Route not found for this id :: " + id));
    }
    private String getAirportNameByAirportCode(String airportCode){
        Airport airport = airportRepository.findById(airportCode).orElse(null);
        return airport.getAirport_name();
    }

    private List<Airport> getAirportCodesByAirportNames(String departureAirportName,String arrivalAirportName){
        String query = "Select * from airport where airport_name = ? or airport_name = ? ";
        List<Airport> airports=(this.airportDetails.query(query, BeanPropertyRowMapper.newInstance(Airport.class),departureAirportName,arrivalAirportName));
        return airports;
    }



}
