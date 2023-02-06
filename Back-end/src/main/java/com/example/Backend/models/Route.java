package com.example.Backend.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Entity
@Table(name = "Routes")
public class Route {

    private int id ;
    private String arrivalAirport;
    private String departureAirport;
    private double mileage;
    private double duration;
    @Version
    private Long version;
    private Date createdTime;
    private Date lastUpdatedTime;
    private String status;
    public Route(int id, String arrivalAirport, String departureAirport, double mileage, double duration) {
        this.id = id;
        this.arrivalAirport = arrivalAirport;
        this.departureAirport = departureAirport;
        this.mileage = mileage;
        this.duration = duration;
    }

    public Route() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    @Column(name = "arrivalAirport", nullable = false)
    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }
    @Column(name = "departureAirport", nullable = false)
    public String getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }
    @Column(name = "mileage", nullable = false)
    public double getMileage() {
        return mileage;
    }

    public void setMileage(double mileage) {
        this.mileage = mileage;
    }
    @Column(name = "duration", nullable = false)
    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }
    @Column(name = "version", nullable = false)
    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
    @Column(name = "createdTime", nullable = false)
    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }
    @Column(name = "lastUpdatedTime", nullable = false)
    public Date getLastUpdatedTime() {
        return lastUpdatedTime;
    }

    public void setLastUpdatedTime(Date lastUpdatedTime) {
        this.lastUpdatedTime = lastUpdatedTime;
    }
    @Column(name = "status", nullable = false)
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
