package com.example.Backend.services;

import com.example.Backend.models.Route;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getAllRoutes(){
       return routeRepository.getAllRoutes();
    }
    public ResponseEntity<HttpStatus> deleteRoute(int id){
        try {
            this.routeRepository.deleteRoute(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<Route> updateRoute(Route route){
        try{
            this.routeRepository.updateRoute(route);
            return new ResponseEntity<>(route,HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(route,HttpStatus.NOT_FOUND);
        }
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
