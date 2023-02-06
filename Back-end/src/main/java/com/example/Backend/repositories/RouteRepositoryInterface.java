package com.example.Backend.repositories;

import com.example.Backend.models.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepositoryInterface extends JpaRepository<Route,Integer> {


}
