package com.example.Backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "flights_table")
public class Flight {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="departure_airport", length=3, nullable = false)
    private String departureAirport;
    @Column(name="arrival_airport", length=3,nullable = false)
    private String arrivalAirport;
    @Column(name="flight_no", length=6,nullable = false)
    private String flightNo;
    @Column(name="departure_time",nullable = false)
    private LocalDateTime departureTime;
    @Column(name="arrival_time", nullable = false)
    private LocalDateTime arrivalTime;
    @Column(name="created_time", nullable = false)
    private LocalDateTime createdTime;
    @Column(name="last_updated_time", nullable = false)
    private LocalDateTime lastUpdatedTime;
    @Enumerated(EnumType.STRING)
    private Status status = Status.active;
    @Version
    private int version =1;

    public Flight(){

    }

    /*public Flight(int id, String departureAirport, String arrivalAirport, String flightNo, String departureDate, String arrivalDate) {
        this.id=id;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightNo = flightNo;
        this.departureTime = departureDate;
        this.arrivalTime = arrivalDate;
    }*/

    public enum Status{
        active,
        inactive
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

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }
    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
