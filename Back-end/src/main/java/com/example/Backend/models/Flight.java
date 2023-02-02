package com.example.Backend.models;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class Flight {
    @NotBlank(message = "ID cannot be empty")
    @Min(value = 0, message = "ID should be an integer greater than 0")
    private int id;
    @NotBlank(message = "Departure Airport cannot be empty")
    @Pattern(regexp="^[A-Za-z ]*$",message = "Invalid Input")
    private String departureAirport;
    @NotBlank(message = "Arrival Airport cannot be empty")
    @Pattern(regexp="^[A-Za-z ]*$",message = "Invalid Input")
    private String arrivalAirport;
    @NotBlank(message = "Flight number cannot be empty")
    @Pattern(regexp="/^[a-zA-Z]{2}[0-9]{4}$/",message = "Flight number should have 2 letters following 4 numbers")
    private String flightNo;
    @NotBlank(message = "Departure time cannot be empty")
    @Future(message = "Departure date should be from the future")
    private String departureTime;
    @NotBlank(message = "Arrival time cannot be empty")
    @Future(message = "Arrival date should be from the future")
    private String arrivalTime;

    
    public Flight(int id, String departureAirport, String arrivalAirport, String flightNo, String departureDate, String arrivalDate) {
        this.id=id;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightNo = flightNo;
        this.departureTime = departureDate;
        this.arrivalTime = arrivalDate;
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

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureDate) {
        this.departureTime = departureDate;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }
}
