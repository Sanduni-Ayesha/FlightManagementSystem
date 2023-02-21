package com.example.Backend.controllers;

import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.services.FlightService;
import com.example.Backend.services.ScheduleFlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/flight")
public class ScheduleFlightController {
    private ScheduleFlightService scheduleFlightService;
    @Autowired
    public ScheduleFlightController(ScheduleFlightService scheduleFlightService) {
        this.scheduleFlightService = scheduleFlightService;
    }

    @PostMapping("/schedule-flight")
    public ResponseEntity<FlightDto> createScheduleFlight(@RequestBody ScheduleFlightDto scheduleFlightDto){
        return new ResponseEntity<>(scheduleFlightService.createSchedule(scheduleFlightDto), HttpStatus.OK);
    }
}
