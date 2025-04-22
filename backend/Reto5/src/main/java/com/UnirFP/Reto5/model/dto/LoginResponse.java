package com.UnirFP.Reto5.model.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    private long expiresIn;
}
