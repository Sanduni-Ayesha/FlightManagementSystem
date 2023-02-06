package com.example.Backend.repositories;

import com.example.Backend.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepositoryInterface extends JpaRepository<Flight, Integer> {

}
