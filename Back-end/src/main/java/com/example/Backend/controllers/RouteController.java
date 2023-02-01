package com.example.Backend.controllers;

import com.example.Backend.models.Route;
import com.example.Backend.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
@CrossOrigin("http://localhost:4200")
public class RouteController {
    @Autowired
    private RouteService routeService;

    @GetMapping("/get_route")
    public List<Route> findAllRoute(){
        System.out.println(routeService.getRoutes());
        return routeService.getRoutes();
    }

    @DeleteMapping("/delete-route/{id}")
    public String deleteRoute(@PathVariable("id") int id){
        return this.routeService.removeRoute(id);
    }
}
