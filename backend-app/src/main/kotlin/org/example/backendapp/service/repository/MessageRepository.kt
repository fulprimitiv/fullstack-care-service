package org.example.backendapp.service.repository

import org.springframework.data.jpa.repository.JpaRepository

interface MessageRepository : JpaRepository<Message, Long>{
    
}