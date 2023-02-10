package com.example.Backend.daoImpl;

import com.example.Backend.dao.RouteDao;
import com.example.Backend.models.Route;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class RouteDaoImplementation implements RouteDao<Route> {
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<Route> searchRoute(String departureAirport, String arrivalAirport) {
        String table = "route";
        String query = "SELECT * FROM "+table;
        if(departureAirport.isEmpty() && arrivalAirport.isEmpty() ){
           List<Route> allRoutesDetails= this.jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Route.class));
            return allRoutesDetails;
        }
        else if (departureAirport.isEmpty() && !arrivalAirport.isEmpty() ) {
            List<Route> searchedRoutesDetailsByDeparture= this.jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Route.class));
            return searchedRoutesDetailsByDeparture;
        }
        else if (!departureAirport.isEmpty() && arrivalAirport.isEmpty() ) {
            List<Route> searchedRoutesDetailsByArrival= this.jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Route.class));
            return searchedRoutesDetailsByArrival;
        }
        else if (!departureAirport.isEmpty() && arrivalAirport.isEmpty() ) {
            List<Route> searchedRoutesDetailsByArrival= this.jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Route.class));
            return searchedRoutesDetailsByArrival;
        }
        return null;
    }
}
