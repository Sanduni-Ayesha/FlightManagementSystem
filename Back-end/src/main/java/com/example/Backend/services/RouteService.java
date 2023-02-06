package com.example.Backend.services;

import com.example.Backend.exceptions.RouteNotFoundException;
import com.example.Backend.models.Route;
import com.example.Backend.repositories.RouteRepository;
import com.example.Backend.repositories.RouteRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {
    private RouteRepository routeRepository;
    private RouteRepositoryInterface routeRepositoryInterface;
    public List<Route> getAllRoutes(){
       return routeRepositoryInterface.findAll();
    }
    @Autowired
    public RouteService(RouteRepositoryInterface routeRepositoryInterface) {
        this.routeRepositoryInterface = routeRepositoryInterface;
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
        try{
            this.routeRepository.addRoute(route);
            return new ResponseEntity<>(route,HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(route,HttpStatus.BAD_REQUEST);
        }
    }
}
