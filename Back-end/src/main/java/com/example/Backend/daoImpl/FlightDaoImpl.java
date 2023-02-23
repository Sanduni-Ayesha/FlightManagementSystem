package com.example.Backend.daoImpl;

import com.example.Backend.dto.FlightDto;
import com.example.Backend.dto.ScheduleFlightDto;
import com.example.Backend.dto.SearchFlightDto;
import com.example.Backend.models.Flight;
import com.example.Backend.dao.FlightDao;
import com.example.Backend.queryBuilder.ScheduleFlightQueryBuilder;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FlightDaoImpl implements FlightDao {

    private JdbcTemplate jdbcTemplate;

    public FlightDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Flight> searchFlights(SearchFlightDto searchFlightDto) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Select * from flight ");
        stringBuilder.append(createQueryForSearch(searchFlightDto));
        String sql = stringBuilder + " order by departure_time";
        List<Flight> flights = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Flight.class));
        return flights;
    }

    private String createQueryForSearch(SearchFlightDto searchFlightDto) {
        List<String> queryList = new ArrayList<>();
        if (searchFlightDto.getDepartureAirport() != null) {
            if (!searchFlightDto.getDepartureAirport().equals("")) {
                queryList.add("departure_airport='" + searchFlightDto.getDepartureAirport() + "'");
            }
        }
        if (searchFlightDto.getArrivalAirport() != null) {
            if (!searchFlightDto.getArrivalAirport().equals("")) {
                queryList.add("arrival_airport='" + searchFlightDto.getArrivalAirport() + "'");
            }
        }
        if (searchFlightDto.getFlightNo() != null) {
            if (!searchFlightDto.getFlightNo().equals("")) {
                queryList.add("flight_no='" + searchFlightDto.getFlightNo() + "'");
            }
        }
        if (searchFlightDto.getDepartureTime() != null) {
            if (!searchFlightDto.getDepartureTime().equals("")) {
                queryList.add("CAST(departure_time AS DATE)='" + searchFlightDto.getDepartureTime() + "'");
            }
        }
        if (searchFlightDto.getArrivalTime() != null) {
            if (!searchFlightDto.getArrivalTime().equals("")) {
                queryList.add("CAST(arrival_time AS DATE)='" + searchFlightDto.getArrivalTime() + "'");
            }
        }
        String finalString = String.join(" AND ", queryList);
        if (!queryList.isEmpty()) {
            return (" WHERE " + finalString);
        }
        return "";
    }

    @Override
    public boolean checkDuplicate(FlightDto flightDto) {
        String sqlCheckDuplicates = "Select * from flight where flight_no='" + flightDto.getFlightNo() + "'" + "and DATE(departure_time)=DATE('" + flightDto.getDepartureTime() + "') and not (id='" + flightDto.getId() + "');";
        List<Flight> flights = jdbcTemplate.query(sqlCheckDuplicates, BeanPropertyRowMapper.newInstance(Flight.class));
        if (flights.size() >= 1) {
            return true;
        }
        return false;
    }

    @Override
    public Flight checkDuplicateByAllScheduleFlights(ScheduleFlightDto scheduleFlightDto) {
        String query = ScheduleFlightQueryBuilder.availableFlightCheckerQuery(scheduleFlightDto);
        List<Flight> flights = jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Flight.class));
        if (flights.size() == 0) {
            return null;
        }
        return flights.get(0);
    }

}
