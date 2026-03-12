package org.model.dto;

import org.model.Role;

public record AuthenticationResponse(
        String message,
        String token,
        String username,
        Role role
) {
}
