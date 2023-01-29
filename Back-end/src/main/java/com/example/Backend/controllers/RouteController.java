package com.example.Backend.controllers;

import com.example.Backend.models.Route;
import com.example.Backend.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/route")
public class RouteController {
    @Autowired
    private RouteService routeService;

    @GetMapping("/get_route")
    public List<Route> getAllRoute(){
        return routeService.getRoutes();
    }
}
