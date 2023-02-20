package com.example.Backend.dtoMapper;

import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.models.Flight;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class FlightSchedulerMapper {
    public List<Flight> convertScheduleFlightDtoToFlight(ScheduleFlightDto scheduleFlightDto) {

        List<LocalDateTime> scheduleDates = getDateRange(
                scheduleFlightDto.getStartDate(), scheduleFlightDto.getEndDate(), scheduleFlightDto.getWeekdays());
        List<Flight> scheduleFlights = new ArrayList<>();
        if (scheduleDates != null) {
            for (LocalDateTime date : scheduleDates) {
                Flight flight = new Flight();
                flight.setDepartureAirport(scheduleFlightDto.getDepartureAirport());
                flight.setArrivalAirport(scheduleFlightDto.getArrivalAirport());
                flight.setCreatedTime(scheduleFlightDto.getCreatedTime());
                flight.setLastUpdatedTime(scheduleFlightDto.getCreatedTime());
                flight.setFlightNo(scheduleFlightDto.getFlightNo());
                flight.setDepartureTime(scheduleFlightDto.getDepartureTime().atDate(date.toLocalDate()));
                if (scheduleFlightDto.getArrivalTime().isBefore(scheduleFlightDto.getDepartureTime())) {

                    flight.setArrivalTime(scheduleFlightDto.getArrivalTime().atDate(date.plusDays(1).toLocalDate()));
                } else {
                    flight.setArrivalTime(scheduleFlightDto.getArrivalTime().atDate(date.toLocalDate()));
                }

                scheduleFlights.add(flight);
            }
        }
        return scheduleFlights;
    }

    private List<LocalDateTime> getDateRange(LocalDateTime startDate, LocalDateTime endDate, List<String> weekdays) {

        LocalDate startDateOfSchedule = startDate.toLocalDate();
        LocalDate endDateOfSchedule = endDate.toLocalDate();
        List<LocalDate> listOfDates = startDateOfSchedule.datesUntil(endDateOfSchedule).toList();
        List<LocalDateTime> scheduleDates = new ArrayList<>();
        for (LocalDate localDate : listOfDates) {
            if (weekdays.contains(localDate.getDayOfWeek().toString())) {
                scheduleDates.add(localDate.atStartOfDay());
            }
        }
        if (scheduleDates.size() == 0) {
            return null;
        }
        return scheduleDates;

    }

}
