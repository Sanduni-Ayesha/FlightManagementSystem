package com.example.Backend.repositories;

import com.example.Backend.exceptions.RouteNotFoundException;
import com.example.Backend.models.Route;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RouteRepository {
    private List<Route> routes = new ArrayList<Route>();

    public RouteRepository() {
        this.routes.add(new Route(1, "Sofia Airport", "Varna Airport", 200, 30));
        this.routes.add(new Route(2, "Bandaranaike International Colombo Airport", "London Luton Airport", 250, 32));
        this.routes.add(new Route(3, "Honiara International Airport", "Tokyo Haneda International Airport", 300, 38));
        this.routes.add(new Route(4, "Indianapolis International Airport", "Turin Airport", 290, 35));
    }

    public List<Route> getAllRoutes() {
        return routes;
    }

    public void deleteRoute(int id) {
        this.routes.removeIf(route->(route.getId()==id));
    }

}