package com.example.Backend.dtoMapper;

import com.example.Backend.dto.RouteDto;
import com.example.Backend.models.Route;

public class RouteMapper {
    public static Route routeDtoToRouteMapper(RouteDto routeDto){
        Route route = new Route();
        route.setId(routeDto.getId());
        route.setArrivalAirport(routeDto.getArrivalAirport());
        route.setDepartureAirport(routeDto.getDepartureAirport());
        route.setMileage(routeDto.getMileage());
        route.setDuration(routeDto.getDuration());
        route.setVersion(routeDto.getVersion());
        route.setCreatedTime(routeDto.getCreatedTime());
        route.setLastUpdatedTime(routeDto.getLastUpdatedTime());
        return route;
    }
}
