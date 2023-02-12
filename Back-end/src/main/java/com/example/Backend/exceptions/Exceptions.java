package com.example.Backend.exceptions;
public class Exceptions extends RuntimeException{
    private final ResponseStatusCodes responseCode;

    public Exceptions(ResponseStatusCodes responseCode){
        this.responseCode = responseCode;
    }
    public ResponseStatusCodes getResponseCode() {
        return responseCode;
    }

    public int getResponseCodeValue(){
        return ResponseStatusCodes.valueOf(responseCode);
    }
}
