package com.example.Backend.models;

import com.example.Backend.dto.RouteDto;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "route")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "arrival_airport", nullable = false)
    private String arrivalAirport;
    @Column(name = "departure_airport", nullable = false)
    private String departureAirport;
    @Column(name = "mileage", nullable = false)
    private double mileage;
    @Column(name = "duration", nullable = false)
    private double duration;
    @Version
    @Column(name = "version", nullable = false)
    private Long version;
    @Column(name = "created_time", nullable = false)
    private Date createdTime;
    @Column(name = "last_updated_time", nullable = false)
    private Date lastUpdatedTime;
    @Enumerated(EnumType.STRING)
    private Route.Status status = Route.Status.active;

    public Route() {

    }

    public Route(RouteDto routeDto) {
        setId(routeDto.getId());
        setArrivalAirport(routeDto.getArrivalAirport());
        setDepartureAirport(routeDto.getDepartureAirport());
        setMileage(routeDto.getMileage());
        setDuration(routeDto.getDuration());
        setVersion(routeDto.getVersion());
        setCreatedTime(routeDto.getCreatedTime());
        setLastUpdatedTime(routeDto.getLastUpdatedTime());
    }

    public Route routeUpdate(RouteDto routeDto) {
        setArrivalAirport(routeDto.getArrivalAirport());
        setDepartureAirport(routeDto.getDepartureAirport());
        setMileage(routeDto.getMileage());
        setDuration(routeDto.getDuration());
        setCreatedTime(routeDto.getCreatedTime());
        setLastUpdatedTime(routeDto.getLastUpdatedTime());
        return this;

    }

    public enum Status {
        active,
        inactive
    }

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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
