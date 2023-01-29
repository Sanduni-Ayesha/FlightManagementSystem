package com.example.Backend.models;

import org.springframework.stereotype.Component;

@Component
public class Route {
    private long id ;
    private String arrivalAirport;
    private String departureAirport;
    private double mileage;
    private double duration;

    public Route(long id, String arrivalAirport, String departureAirport, double mileage, double duration) {
        this.id = id;
        this.arrivalAirport = arrivalAirport;
        this.departureAirport = departureAirport;
        this.mileage = mileage;
        this.duration = duration;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public String getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public double getMileage() {
        return mileage;
    }

    public void setMileage(double mileage) {
        this.mileage = mileage;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }
}
