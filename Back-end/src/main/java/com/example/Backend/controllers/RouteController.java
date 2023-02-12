package com.example.Backend.controllers;
import com.example.Backend.exceptions.Exceptions;
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
    public ResponseEntity<List<Route>>getRoutes(@RequestParam("departureAirport") String departureAirport,
                                                   @RequestParam("arrivalAirport") String arrivalAirport){
        return new ResponseEntity<>(this.routeService.getRoutes(departureAirport,arrivalAirport),(HttpStatus.OK)) ;
    }

    @DeleteMapping("/delete-route")
    public ResponseEntity<?> deleteRoute(@RequestParam("id") int id){
       return new ResponseEntity<>(this.routeService.deleteRoute(id),HttpStatus.OK);

}
    @PutMapping("/update-route")
    public ResponseEntity<?> updateRoute(@RequestBody Route route){
            return  new ResponseEntity<>(this.routeService.updateRoute(route),HttpStatus.OK);


    }
    @PostMapping("/add-route")
    public ResponseEntity<?> addRoute(@RequestBody Route route){
            return new ResponseEntity<>(this.routeService.addRoute(route),HttpStatus.OK);


    }
}
