package com.example.Backend.repository;

import com.example.Backend.models.Route;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RouteRepository {
    private List<Route> routes = new ArrayList<Route>();

    public RouteRepository(){
        this.routes = List.of(
                new Route(1,"Sofia Airport","Varna Airport",200,30),
                new Route(2,"Bandaranaike International Colombo Airport","London Luton Airport",250,32),
                new Route(3,"Honiara International Airport","Tokyo Haneda International Airport",300,38),
                new Route(4,"Indianapolis International Airport","Turin Airport",290,35)
        );
    }
    public List<Route> getAllRoutes(){
        return routes;
    }

}
