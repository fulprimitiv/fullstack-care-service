package org.example.backendapp.controller.dto

import org.example.backendapp.entity.HelpRequestStatus
import org.example.backendapp.entity.HelpRequestType
import java.time.Instant

data class HelpRequestDto(
    val id: Long,
    val type: HelpRequestType,
    val description: String,
    val address: String,
    val requestDate: Instant,
    val recipientId: Long,
    val volunteerId: Long?,
    val status: HelpRequestStatus,
    val rating: Int?,
    val comment: String?
)
