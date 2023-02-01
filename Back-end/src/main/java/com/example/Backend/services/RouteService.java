package com.example.Backend.services;

import com.example.Backend.models.Route;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getRoutes(){
       return routeRepository.getAllRoutes();
    }
    public ResponseEntity<HashMap<String, Object>> deleteRoute(int id){
        HashMap<String, Object> routeResponse = new HashMap<String, Object>();
        try {
            this.routeRepository.deleteRoute(id);
            routeResponse.put("message", "Route is deleted successfully!");
            return new ResponseEntity<>(routeResponse, HttpStatus.OK);
        }catch (Exception ex) {
            routeResponse.clear();
            routeResponse.put("message", "Route is not found");
            return new ResponseEntity<>(routeResponse, HttpStatus.NOT_FOUND);
        }
    }
}
