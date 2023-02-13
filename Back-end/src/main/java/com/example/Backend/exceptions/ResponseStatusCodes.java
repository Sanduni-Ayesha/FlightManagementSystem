package com.example.Backend.exceptions;

public enum ResponseStatusCodes {
    FLIGHT_NOT_FOUND_EXCEPTION(432),
    FLIGHT_ALREADY_DELETED_EXCEPTION(433),
    FLIGHT_EXISTS_EXCEPTION(434),
    INVALID_FLIGHT_EXCEPTION(435),
    FLIGHT_ADD_SUCCESSFUL(230),
    FLIGHT_DELETE_SUCCESSFUL(231),
    FLIGHT_UPDATE_SUCCESSFUL(232),
    ROUTE_NOT_EXISTS_EXCEPTION(436),
    INVALID_ROUTE_EXCEPTION(437),
    ROUTE_EXISTS_EXCEPTION(438),
    ROUTE_ALREADY_UPDATED_EXCEPTION(439)
    ;

    private int responseCode;
    ResponseStatusCodes(int responseCode) {
    }

    public int getResponseCode() {
        return responseCode;
    }
    public static int valueOf(ResponseStatusCodes responseStatusCodes){
        return responseStatusCodes.responseCode;
    }
}
