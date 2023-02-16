package com.example.Backend.queryBuilder;

import com.example.Backend.dto.SearchDTO;

public class RouteQueryBuilder {
    public static String searchQuery(SearchDTO searchDTO){
        String query = "SELECT * FROM route WHERE status='active'";
        if(searchDTO.getDepartureAirport()!=null && !searchDTO.getDepartureAirport().equals("")){
            query+="and departure_airport ='" + searchDTO.getDepartureAirport()+"'";
        }
        if (searchDTO.getArrivalAirport()!=null && !searchDTO.getArrivalAirport().equals("")) {
            query+=" and arrival_airport ='" + searchDTO.getArrivalAirport()+"'";
        }
        return query;
    }
}
