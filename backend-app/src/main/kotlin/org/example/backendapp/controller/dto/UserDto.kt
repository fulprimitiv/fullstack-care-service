package org.example.backendapp.controller.dto

import org.example.backendapp.entity.UserRole
import java.time.Instant

data class UserDto(
    val id: Long,
    val name: String,
    val phone: String,
    val birthday: Instant,
    val email: String,
    val role: UserRole,
    val registeredAt: Instant,
)
