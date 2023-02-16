package com.example.Backend.dao;

import java.util.List;

import com.example.Backend.dto.SearchDTO;
import com.example.Backend.models.Route;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteDao<T> {
    List<Route> searchRoute(SearchDTO searchDTO);

}
