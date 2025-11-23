package org.example.backendapp.service.command

import org.example.backendapp.entity.HelpRequestType
import java.time.Instant

data class CreateHelpRequestCommand(
    val type: HelpRequestType,
    val description: String,
    val address: String,
    val requestDate: Instant,
    val recipientId: Long,
)