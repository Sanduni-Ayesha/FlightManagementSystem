package com.example.Backend.daoImpl;

import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.models.Flight;
import com.example.Backend.dao.FlightDao;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class FlightDaoImpl implements FlightDao {

    private JdbcTemplate jdbcTemplate;

    public FlightDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Flight> searchFlights(SearchDTO searchDTO) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Select * from flight where status='active'");
        stringBuilder.append(createQueryForSearch(searchDTO));
        List<Flight> flights = jdbcTemplate.query(stringBuilder.toString(), BeanPropertyRowMapper.newInstance(Flight.class));
        return flights;
    }

    private String createQueryForSearch(SearchDTO searchDTO) {
        List<String> queryList = new ArrayList<>();
        if (!searchDTO.getDepartureAirport().equals("")) {
            queryList.add("departure_airport='" + searchDTO.getDepartureAirport() + "'");
        }
        if (!searchDTO.getArrivalAirport().equals("")) {
            queryList.add("arrival_airport='" + searchDTO.getArrivalAirport() + "'");
        }
        String finalString = String.join(" AND ", queryList);
        if (!queryList.isEmpty()) {
            return (" AND " + finalString);
        }
        return "";
    }

    @Override
    public boolean checkDuplicate(FlightDto flightDto) {
        String sqlCheckDuplicates = "Select * from flight where " +
                "(departure_time<='" + flightDto.getDepartureTime() + "'and arrival_time>='" + flightDto.getDepartureTime() + "') or" +
                "(departure_time<='" + flightDto.getArrivalTime() + "'and arrival_time>='" + flightDto.getArrivalTime() + "') or" +
                "(departure_time>='" + flightDto.getDepartureTime() + "'and arrival_time<='" + flightDto.getArrivalTime() + "')" +
                "and flight_no='" + flightDto.getFlightNo() + "'";
        List<Flight> flights = jdbcTemplate.query(sqlCheckDuplicates, BeanPropertyRowMapper.newInstance(Flight.class));
        if (flights.size() > 1) {
            return true;
        }
        return false;
    }
    @Override
    public Flight checkDuplicateByAllScheduleFlights(ScheduleFlightDto scheduleFlightDto) {
        String query = " SELECT * FROM flight WHERE flight_no='" + scheduleFlightDto.getFlightNo() + "' AND" + " departure_time between '" +
                scheduleFlightDto.getStartDate() + "' AND '" + scheduleFlightDto.getEndDate() + "' AND (";
        for (int index = 0; index < scheduleFlightDto.getWeekdays().size() - 1; index++) {
            query += "UPPER(dayname(departure_time)) = '" + scheduleFlightDto.getWeekdays().get(index) + "' OR ";
        }
        query += "UPPER(dayname(departure_time)) = '" + scheduleFlightDto.getWeekdays().get(scheduleFlightDto.getWeekdays().size() - 1) + "')"
                + "ORDER BY departure_time limit 1";
        List<Flight> flights = jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Flight.class));
        if (flights.size() == 0) {
            return null;
        }
        return flights.get(0);
    }

}
