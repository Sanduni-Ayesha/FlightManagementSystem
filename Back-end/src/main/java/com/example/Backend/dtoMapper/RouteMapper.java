package com.example.Backend.dtoMapper;

import com.example.Backend.dto.RouteDto;
import com.example.Backend.models.Route;

public class RouteMapper {
    public static Route routeDtoToRouteMapper(RouteDto routeDto) {
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

    public static RouteDto routeToRouteDtoMapper(Route route) {
        RouteDto routeDto = new RouteDto();
        routeDto.setId(route.getId());
        routeDto.setArrivalAirport(route.getArrivalAirport());
        routeDto.setDepartureAirport(route.getDepartureAirport());
        routeDto.setMileage(route.getMileage());
        routeDto.setDuration(route.getDuration());
        routeDto.setVersion(route.getVersion());
        routeDto.setCreatedTime(route.getCreatedTime());
        routeDto.setLastUpdatedTime(route.getLastUpdatedTime());
        return routeDto;
    }
}
