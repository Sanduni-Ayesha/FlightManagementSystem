package com.example.Backend.services;

import com.example.Backend.models.Route;
import com.example.Backend.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getRoutes(){
       return routeRepository.getAllRoutes();
    }
}
