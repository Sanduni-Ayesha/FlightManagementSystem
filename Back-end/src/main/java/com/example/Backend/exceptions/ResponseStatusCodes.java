package com.example.Backend.exceptions;

public enum ResponseStatusCodes {
    FLIGHT_ADD_SUCCESSFUL(230),
    FLIGHT_DELETE_SUCCESSFUL(231),
    FLIGHT_UPDATE_SUCCESSFUL(232),
    ROUTE_NOT_EXISTS_EXCEPTION(233),
    INVALID_ROUTE_EXCEPTION(234),
    ROUTE_EXISTS_EXCEPTION(235),
    ROUTE_ALREADY_UPDATED_EXCEPTION(236),
    FLIGHT_NOT_FOUND_EXCEPTION(237),
    FLIGHT_ALREADY_DELETED_EXCEPTION(238),
    FLIGHT_EXISTS_EXCEPTION(239),
    INVALID_FLIGHT_EXCEPTION(240),
    FLIGHT_ALREADY_UPDATED_EXCEPTION(241),
    ROUTE_ALREADY_DELETED_EXCEPTION(242),
    DEPARTURE_AIRPORT_AND_ARRIVAL_AIRPORT_SAME_EXCEPTION(243),
    ROUTE_ALREADY_IN_INACTIVE_STATE_EXCEPTION(244),
    SCHEDULE_DATA_INVALID(245),
    DATE_NOT_IN_RANGE_EXCEPTION(246);

    private int responseCode;

    ResponseStatusCodes(int responseCode) {
        this.responseCode = responseCode;
    }

    public int getResponseCode() {
        return responseCode;
    }

    public static int valueOf(ResponseStatusCodes responseStatusCodes) {
        return responseStatusCodes.responseCode;
    }
}
