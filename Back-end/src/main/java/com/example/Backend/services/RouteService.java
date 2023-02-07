package com.example.Backend.services;

import com.example.Backend.exceptions.RouteNotFoundException;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.RouteRepository;
import com.example.Backend.repositories.RouteRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {
    private RouteRepository routeRepository;
    private JdbcTemplate routeDetails;
    private RouteRepositoryInterface routeRepositoryInterface;
    @Autowired
    public RouteService(RouteRepositoryInterface routeRepositoryInterface,JdbcTemplate routeDetails) {
        this.routeRepositoryInterface = routeRepositoryInterface;
        this.routeDetails= routeDetails;
    }
    public List<Route> getAllRoutes(){
        String query = "Select * from route";
       List<Route> allRoutes=(this.routeDetails.query(query, BeanPropertyRowMapper.newInstance(Route.class)));
       return allRoutes;
    }
    public ResponseEntity<HttpStatus> deleteRoute(int id){
        try {
            this.routeRepositoryInterface.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<Route> updateRoute(Route route) throws RouteNotFoundException {

        Route UpdatingRoute = routeRepositoryInterface.findById(route.getId())
                .orElseThrow(() -> new RouteNotFoundException("Route not found for this id :: " + route.getId()));
        UpdatingRoute.setArrivalAirport(route.getArrivalAirport());
        UpdatingRoute.setDepartureAirport(route.getDepartureAirport());
        UpdatingRoute.setMileage(route.getMileage());
        UpdatingRoute.setDuration(route.getDuration());
        UpdatingRoute.setCreatedTime(route.getCreatedTime());
        UpdatingRoute.setLastUpdatedTime(route.getLastUpdatedTime());
        Route updatedRoute = routeRepositoryInterface.save(UpdatingRoute);
        return ResponseEntity.ok(updatedRoute);
    }

    public ResponseEntity<Route> addRoute(Route route){
       return ResponseEntity.ok(routeRepositoryInterface.save(route));
    }
}
