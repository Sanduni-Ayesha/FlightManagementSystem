package com.example.Backend.dto;

import com.example.Backend.models.Route;

import java.util.Date;

public class RouteDto {
    private int id;
    private String arrivalAirport;
    private String departureAirport;
    private double mileage;
    private double duration;
    private Long version;
    private Date createdTime;
    private Date lastUpdatedTime;
    public RouteDto(Route route){
        setId(route.getId());
        setArrivalAirport(route.getArrivalAirport());
        setDepartureAirport(route.getDepartureAirport());
        setMileage(route.getMileage());
        setDuration(route.getDuration());
        setVersion(route.getVersion());
        setCreatedTime(route.getCreatedTime());
        setLastUpdatedTime(route.getLastUpdatedTime());
    }
    public RouteDto(){}
    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getLastUpdatedTime() {
        return lastUpdatedTime;
    }

    public void setLastUpdatedTime(Date lastUpdatedTime) {
        this.lastUpdatedTime = lastUpdatedTime;
    }

    public Boolean isValidRoute() {
        String airportPattern = "[A-Z]{3}";
        String floatPattern = "^[1-9]\\d*(\\.\\d+)?$";

        if (getDepartureAirport().matches(airportPattern) &&
                getArrivalAirport().matches(airportPattern) &&
                Double.toString(getMileage()).matches(floatPattern) &&
                Double.toString(getDuration()).matches(floatPattern)) {
            return true;
        } else {
            return false;
        }
    }
}
