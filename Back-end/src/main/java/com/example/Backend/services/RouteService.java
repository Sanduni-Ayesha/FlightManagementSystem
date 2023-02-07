package com.example.Backend.services;

import com.example.Backend.exceptions.RouteNotFoundException;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    private JdbcTemplate routeDetails;
    private RouteRepository routeRepository;
    @Autowired
    public RouteService(RouteRepository routeRepositoryInterface, JdbcTemplate routeDetails) {
        this.routeRepository = routeRepositoryInterface;
        this.routeDetails= routeDetails;
    }
    public List<Route> getAllRoutes(){
        String query = "Select * from route";
       List<Route> allRoutes=(this.routeDetails.query(query, BeanPropertyRowMapper.newInstance(Route.class)));
       return allRoutes;
    }
    public ResponseEntity<HttpStatus> deleteRoute(int id){
        try {
            this.routeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<Route> updateRoute(Route route) throws RouteNotFoundException {

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
}
