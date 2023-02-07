package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepositoryInterface extends JpaRepository<Flight, Integer> {

}
