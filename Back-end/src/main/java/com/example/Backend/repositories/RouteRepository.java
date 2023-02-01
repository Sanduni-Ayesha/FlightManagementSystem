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
    public Route findRoute(int id) {
        for (Route route : this.routes) {
            if (route.getId() == id) {
                return route;
            }
        }
        return null;
    }
    public int findLastRouteId(){
        int routeArrayLength = this.routes.size();
        return this.routes.get(routeArrayLength-1).getId();
    }
    public void updateRoute(Route route){
        Route updatableRoute = findRoute(route.getId());
        updatableRoute.setArrivalAirport(route.getArrivalAirport());
        updatableRoute.setDepartureAirport(route.getDepartureAirport());
        updatableRoute.setDuration(route.getDuration());
        updatableRoute.setMileage(route.getMileage());
        this.routes.set(this.routes.indexOf(findRoute(route.getId())),updatableRoute);
    }
}