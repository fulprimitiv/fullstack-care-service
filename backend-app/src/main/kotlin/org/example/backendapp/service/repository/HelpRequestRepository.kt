package org.example.backendapp.service.repository

import org.example.backendapp.entity.HelpRequest
import org.example.backendapp.entity.HelpRequestStatus
import org.example.backendapp.entity.HelpRequestType
import org.springframework.data.jpa.repository.JpaRepository

interface HelpRequestRepository : JpaRepository<HelpRequest, Long> {
    fun findAllByRecipientIdAndStatus(recipientId: Long, status: HelpRequestStatus): Set<HelpRequest>
    fun findAllByVolunteerIdAndStatus(recipientId: Long, status: HelpRequestStatus): Set<HelpRequest>
    fun findAllByRecipientId(recipientId: Long): Set<HelpRequest>
    fun findAllByVolunteerId(volunteerId: Long): Set<HelpRequest>
    
    fun findAllAndStatusIn(status: List<HelpRequestStatus>): Set<HelpRequest>
}