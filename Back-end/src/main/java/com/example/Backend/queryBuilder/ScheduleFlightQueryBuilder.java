package com.example.Backend.queryBuilder;

import com.example.Backend.dto.ScheduleFlightDto;

public class ScheduleFlightQueryBuilder {
    public static String availableFlightCheckerQuery(ScheduleFlightDto scheduleFlightDto){
        String query = " SELECT * FROM flight WHERE flight_no='" + scheduleFlightDto.getFlightNo() + "' AND" + " departure_time between '" +
                scheduleFlightDto.getStartDate() + "' AND '" + scheduleFlightDto.getEndDate() + "' AND (";
        for (int index = 0; index < scheduleFlightDto.getWeekdays().size() - 1; index++) {
            query += "UPPER(dayname(departure_time)) = '" + scheduleFlightDto.getWeekdays().get(index) + "' OR ";
        }
        query += "UPPER(dayname(departure_time)) = '" + scheduleFlightDto.getWeekdays().get(scheduleFlightDto.getWeekdays().size() - 1) + "')"
                + "ORDER BY departure_time limit 1";
        return query;
    }
}
