package com.example.Backend.models;

public class Flight {
    private int id;
    private String departureAirport;

    private String arrivalAirport;

    private String flightNo;

    private String departureTime;

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
