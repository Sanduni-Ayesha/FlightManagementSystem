package com.example.Backend.daoImpl;

import com.example.Backend.dao.RouteDao;
import com.example.Backend.dto.SearchDTO;
import com.example.Backend.models.Route;
import com.example.Backend.queryBuilder.RouteQueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RouteDaoImpl implements RouteDao<Route> {

    private JdbcTemplate jdbcTemplate;
    @Autowired
    public RouteDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Route> searchRoute(SearchDTO searchDTO) {
        String query = RouteQueryBuilder.searchQuery(searchDTO);
        List<Route> searchedRoutesDetails= this.jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Route.class));
        return searchedRoutesDetails;

    }
}
