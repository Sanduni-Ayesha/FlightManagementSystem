package com.example.Backend.services;

import com.example.Backend.models.Flight;
import com.example.Backend.repositories.FlightDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FlightDaoImpl implements FlightDao {

    public static Logger log = LoggerFactory.getLogger(FlightDaoImpl.class);
    private JdbcTemplate jdbcTemplate;

    public FlightDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    RowMapper<Flight> rowMapper  = (result,rowNumber) ->{
        Flight flight = new Flight();
        flight.setId(result.getInt("id"));
        flight.setDepartureAirport(result.getString("de.airport_name"));
        flight.setArrivalAirport(result.getString("ar.airport_name"));
        flight.setFlightNo(result.getString("flight_no"));
        flight.setDepartureTime(result.getTimestamp("departure_time").toLocalDateTime());
        flight.setArrivalTime(result.getTimestamp("arrival_time").toLocalDateTime());
        return flight;
    };
    @Override
    public List<Flight> getFlights() {
        String sqlGetFlights =
                "select id, " +
                        "ar.airport_name,                                        " +
                        "de.airport_name,                                        " +
                        "flight_no,                                              " +
                        "departure_time,                                         " +
                        "arrival_time from flight                                " +
                        "join airport as ar on arrival_airport = ar.airport_code " +
                        "join airport as de on departure_airport=de.airport_code " +
                        "where status='active';";
        return jdbcTemplate.query(sqlGetFlights, rowMapper);
    }
}
