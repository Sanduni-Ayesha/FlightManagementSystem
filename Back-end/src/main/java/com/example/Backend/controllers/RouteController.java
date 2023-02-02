package com.example.Backend.controllers;
import com.example.Backend.models.Route;
import com.example.Backend.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
@CrossOrigin("http://localhost:4200")
public class RouteController {
    @Autowired
    private RouteService routeService;

    @GetMapping("/get-route")
    public List<Route> getAllRoutes(){
        return routeService.getAllRoutes();
    }

    @DeleteMapping("/delete-route")
    public ResponseEntity<HttpStatus> deleteRoute(@RequestParam("id") int id){
       return this.routeService.deleteRoute(id);

}
}
