package org.example.backendapp.service.command

import org.example.backendapp.service.Undefinable
import java.time.Instant

data class UpdateUserCommand(
    val id: Long,
    val name: Undefinable<String>,
    val email: Undefinable<String>,
    val password: Undefinable<String>,
    val phone: Undefinable<String>,
    val birthDate: Undefinable<Instant>,
    val address: Undefinable<String>
)