package com.bachproject.demo.authentication;

import com.bachproject.demo.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private User user;

//    public AuthenticationResponse(String jwt) {
//        this.jwt = jwt;
//    }
//
//    public String getJwt() {
//        return jwt;
//    }
}
