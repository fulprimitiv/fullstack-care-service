package org.example.backendapp.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class HelpRequest(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Enumerated(EnumType.STRING)
    val type: HelpRequestType,

    val description: String,

    val address: String,

    val requestDateTime: LocalDateTime,

    val status: String,

    @ManyToOne
    val recipient: User,

    @ManyToOne
    val volunteer: User? = null
)