package org.example.backendapp.controller

import org.example.backendapp.controller.dto.UserDto
import org.example.backendapp.entity.User
import org.example.backendapp.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(
    private val userService: UserService,
) {
    @GetMapping("/user/{id}")
    fun getUser(@PathVariable id: Long): ResponseEntity<UserDto?> {
        val user = userService.findById(id)

        return ResponseEntity.ok(user.toDto())
    }
    
    private fun User.toDto() = UserDto(
        id,
        name,
        phone = phone,
        birthday = birthday,
        email = email,
        role = role,
        registeredAt = registeredAt,
    )
}