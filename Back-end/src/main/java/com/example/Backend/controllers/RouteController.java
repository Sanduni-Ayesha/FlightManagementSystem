package com.example.Backend.controllers;

import com.example.Backend.dto.RouteDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.models.Route;
import com.example.Backend.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
public class RouteController {

    private RouteService routeService;

    @Autowired
    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping("/get-route")
    public ResponseEntity<List<Route>> getRoutes(@RequestBody SearchDTO searchDTO) {
        return new ResponseEntity<>(this.routeService.getRoutes(searchDTO), (HttpStatus.OK));
    }

    @DeleteMapping("/delete-route")
    public ResponseEntity<?> deleteRoute(@RequestParam("id") int id) {
        return new ResponseEntity<>(this.routeService.deleteRoute(id), HttpStatus.OK);
    }

    @PutMapping("/update-route")
    public ResponseEntity<?> updateRoute(@RequestBody RouteDto routeDto) {
        return new ResponseEntity<>(this.routeService.updateRoute(routeDto), HttpStatus.OK);
    }

    @PostMapping("/add-route")
    public ResponseEntity<?> addRoute(@RequestBody RouteDto routeDto) {
        return new ResponseEntity<>(this.routeService.addRoute(routeDto), HttpStatus.OK);
    }
}
