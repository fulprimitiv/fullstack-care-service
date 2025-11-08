package org.example.backendapp.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class Message(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne
    val sender: User,
    @ManyToOne
    val recipient: User,
    val content: String,
    val sentAt: LocalDateTime = LocalDateTime.now()
)