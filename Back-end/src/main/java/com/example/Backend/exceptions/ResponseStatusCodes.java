package com.example.Backend.exceptions;

public enum ResponseStatusCodes {
    FLIGHT_NOT_FOUND_EXCEPTION(432),
    FLIGHT_ALREADY_DELETED_EXCEPTION(433),
    FLIGHT_EXISTS_EXCEPTION(434),
    INVALID_FLIGHT_EXCEPTION(435),
    FLIGHT_ALREADY_UPDATED_EXCEPTION(436),
    FLIGHT_ADD_SUCCESSFUL(230),
    FLIGHT_DELETE_SUCCESSFUL(231),
    FLIGHT_UPDATE_SUCCESSFUL(232),
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
