package com.example.Backend.exceptions;

public class RouteNotFoundException extends RuntimeException{
    public RouteNotFoundException(String errorMessage){
        super(errorMessage);
    }
}
