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
    public ResponseEntity<List<Route>>  getAllRoutes(@RequestParam("departureAirport") String departureAirport,
                                           @RequestParam("arrivalAirport") String arrivalAirport){
        return new ResponseEntity<>(this.routeService.getAllRoutes(departureAirport,arrivalAirport),(HttpStatus.OK)) ;
    }

    @DeleteMapping("/delete-route")
    public ResponseEntity<HttpStatus> deleteRoute(@RequestParam("id") int id){
       return this.routeService.deleteRoute(id);

}
    @PutMapping("/update-route")
    public ResponseEntity<Route> updateRoute(@RequestBody Route route){
        return this.routeService.updateRoute(route);
    }
    @PostMapping("/add-route")
    public ResponseEntity<Route> addRoute(@RequestBody Route route){
        return this.routeService.addRoute(route);
    }
}
