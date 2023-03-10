package com.example.Backend.dto;

import com.example.Backend.models.Flight;

import java.time.LocalDateTime;

public class FlightDto {
    private int id;
    private String departureAirport;
    private String arrivalAirport;
    private String flightNo;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private LocalDateTime createdTime;
    private LocalDateTime lastUpdatedTime;
    private int version = 1;

    public FlightDto(Flight flight) {
        setId(flight.getId());
        setDepartureAirport(flight.getDepartureAirport());
        setArrivalAirport(flight.getArrivalAirport());
        setFlightNo(flight.getFlightNo());
        setDepartureTime(flight.getDepartureTime());
        setArrivalTime(flight.getArrivalTime());
        setCreatedTime(flight.getCreatedTime());
        setLastUpdatedTime(flight.getLastUpdatedTime());
        setVersion(flight.getVersion());
    }

    public FlightDto() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getLastUpdatedTime() {
        return lastUpdatedTime;
    }

    public void setLastUpdatedTime(LocalDateTime lastUpdatedTime) {
        this.lastUpdatedTime = lastUpdatedTime;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public boolean validateFlight() {
        if (this.getDepartureAirport().matches("[A-Z]{3}") &&
                this.getArrivalAirport().matches("[A-Z]{3}") &&
                this.getFlightNo().matches("[A-Za-z]{2}[0-9]{4}") &&
                this.getDepartureTime().isAfter(LocalDateTime.now()) &&
                this.getDepartureTime().isBefore(this.getArrivalTime())) {
            return true;
        }
        return false;
    }

}
