package org.example.backendapp.service.command

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import org.example.backendapp.entity.HelpRequestType
import java.time.Instant


data class CreateHelpRequestCommand(
    @field:NotNull(message = "type is required")
    val type: HelpRequestType,
    @field:NotNull(message = "description is required")
    val description: String,
    @field:NotNull(message = "address is required")
    val address: String,
    @field:NotNull(message = "requestDate is required")
    val requestDate: Instant,
    @field:NotNull(message = "recipientId is required")
    @field:Min(value = 1, message = "recipientId must be positive")
    val recipientId: Long,
)