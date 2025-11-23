package org.example.backendapp.service.command

import org.example.backendapp.entity.UserRole
import java.time.Instant

data class CreateUserCommand(
    val name: String,
    val email: String,
    val password: String,
    val role: UserRole,
    val phone: String,
    val birthDate: Instant,
    val address: String
)