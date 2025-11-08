package org.example.backendapp.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalDate

@Entity
data class User(
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,

    val phone: String,

    val address: String,

    val birthDate: LocalDate,

    @Column(unique = true)
    val email: String,

    @Enumerated(EnumType.STRING)
    val role: UserRole,

    val rating: Double = 0.0,

    val registeredAt: LocalDate = LocalDate.now(),

    val completedOrders: Int = 0,

    val activeOrders: Int = 0,

    val password: String
)