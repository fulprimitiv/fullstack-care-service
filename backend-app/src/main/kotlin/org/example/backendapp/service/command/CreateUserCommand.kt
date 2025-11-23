package org.example.backendapp.service.command

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.example.backendapp.entity.UserRole
import java.time.Instant

data class CreateUserCommand(
    @NotBlank
    val name: String,
    @param:Email
    @NotBlank
    val email: String,
    @param:Size(min = 8, max = 255)
    @param:NotBlank
    val password: String,
    @NotBlank
    val role: UserRole,
    @NotBlank
    val phone: String,
    @NotBlank
    val birthDate: Instant,
    @NotBlank
    val address: String
)