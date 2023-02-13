package com.example.Backend.dto;

import java.time.LocalDateTime;

public class FlightDto {
    private String departureAirport;
    private String arrivalAirport;
    private String flightNo;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private LocalDateTime createdTime;
    private LocalDateTime lastUpdatedTime;
    private Status status;
    private int version;

    public enum Status{
        active,
        inactive
    }
}
