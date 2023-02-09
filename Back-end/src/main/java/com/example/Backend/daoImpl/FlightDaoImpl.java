package com.example.Backend.daoImpl;

import com.example.Backend.models.Flight;
import com.example.Backend.dao.FlightDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FlightDaoImpl implements FlightDao {

    public static Logger log = LoggerFactory.getLogger(FlightDaoImpl.class);
    private JdbcTemplate jdbcTemplate;

    public FlightDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Flight> getFlights() {
        String sqlGetFlights =  "Select * from flight where status='active';";
        List<Flight> flights = jdbcTemplate.query(sqlGetFlights, BeanPropertyRowMapper.newInstance(Flight.class));
        return flights;
    }
}
