package com.example.Backend.dao;

import java.util.List;
import com.example.Backend.models.Route;
public interface RouteDao<T> {
    List<Route> searchRoute();
}
