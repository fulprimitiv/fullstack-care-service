package org.example.backendapp.service.repository

import org.example.backendapp.entity.HelpRequest
import org.example.backendapp.entity.HelpRequestType
import org.springframework.data.jpa.repository.JpaRepository

interface HelpRequestRepository : JpaRepository<HelpRequest, Long> {
    fun findByTypeAndAddress(type: HelpRequestType, address: String): List<HelpRequest>
}