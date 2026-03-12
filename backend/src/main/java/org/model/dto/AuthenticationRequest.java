package org.model.dto;

public record AuthenticationRequest(
        String username,
        String password
) {
}
