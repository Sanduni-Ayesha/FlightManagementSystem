package com.example.Backend.dtoMapper;

import com.example.Backend.dto.FlightDto;
import com.example.Backend.models.Flight;

public class FlightMapper {
    public static Flight flightDtoToFlightMapper(FlightDto flightDto){
        Flight flight = new Flight();
        flight.setId(flightDto.getId());
        flight.setDepartureAirport(flightDto.getDepartureAirport());
        flight.setArrivalAirport(flightDto.getArrivalAirport());
        flight.setFlightNo(flightDto.getFlightNo());
        flight.setDepartureTime(flightDto.getDepartureTime());
        flight.setArrivalTime(flightDto.getArrivalTime());
        flight.setCreatedTime(flightDto.getCreatedTime());
        flight.setLastUpdatedTime(flightDto.getLastUpdatedTime());
        flight.setVersion(flightDto.getVersion());
        return flight;
    }

    public static FlightDto flightToFlightDtoMapper(Flight flight){
        FlightDto flightDto = new FlightDto();
        flightDto.setId(flightDto.getId());
        flightDto.setDepartureAirport(flight.getDepartureAirport());
        flightDto.setArrivalAirport(flight.getArrivalAirport());
        flightDto.setFlightNo(flight.getFlightNo());
        flightDto.setDepartureTime(flight.getDepartureTime());
        flightDto.setArrivalTime(flight.getArrivalTime());
        flightDto.setCreatedTime(flight.getCreatedTime());
        flightDto.setLastUpdatedTime(flight.getLastUpdatedTime());
        flightDto.setVersion(flight.getVersion());
        return flightDto;
    }
}
