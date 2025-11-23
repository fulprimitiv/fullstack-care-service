package org.example.backendapp.service.repository

import org.example.backendapp.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long>{
    fun findByEmail(email: String): User?
}