package com.example.Backend.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class ScheduleFlightDto {
    private int id;
    private String departureAirport;
    private String arrivalAirport;
    private String flightNo;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<String> weekdays;

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

    public LocalTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public List<String> getWeekdays() {
        return weekdays;
    }

    public void setWeekdays(List<String> weekdays) {
        this.weekdays = weekdays;
    }

    public boolean validateScheduleFlight() {
        if (getDepartureAirport().matches("[A-Z]{3}") &&
                getArrivalAirport().matches("[A-Z]{3}") &&
                getFlightNo().matches("[A-Za-z]{2}[0-9]{4}") &&
                getArrivalTime() != getDepartureTime()
        ) {
            return true;
        }
        return false;
    }

}
