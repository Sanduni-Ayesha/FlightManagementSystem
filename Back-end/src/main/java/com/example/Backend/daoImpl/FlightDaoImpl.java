package com.example.Backend.daoImpl;

import com.example.Backend.models.Flight;
import com.example.Backend.dao.FlightDao;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class FlightDaoImpl implements FlightDao {

    private JdbcTemplate jdbcTemplate;

    public FlightDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Flight> searchFlights(String departure, String arrival) {
        String sqlGetFlights = "Select * from flight where status='active'";
        if (!departure.equals("all")) {
            sqlGetFlights += ("and departure_airport='" + departure + "'");
        }
        if (!arrival.equals("all")) {
            sqlGetFlights += (" and arrival_airport='" + arrival + "'");
        }
        List<Flight> flights = jdbcTemplate.query(sqlGetFlights, BeanPropertyRowMapper.newInstance(Flight.class));
        return flights;
    }

    @Override
    public boolean checkDuplicate(String flightNo, LocalDateTime departureTime, LocalDateTime arrivalTime) {
        String sqlCheckDuplicates = "Select * from flight where " +
                "(departure_time<'" + departureTime + "'and arrival_time>'" + departureTime + "') or" +
                "(departure_time<'" + arrivalTime + "'and arrival_time>'" + arrivalTime + "') or" +
                "(departure_time<'" + departureTime + "'and arrival_time>'" + arrivalTime + "')" +
                "and flight_no='" + flightNo + "'";
        List<Flight> flights = jdbcTemplate.query(sqlCheckDuplicates, BeanPropertyRowMapper.newInstance(Flight.class));
        if (flights.size() > 1) {
            return true;
        }
        return false;
    }
}
