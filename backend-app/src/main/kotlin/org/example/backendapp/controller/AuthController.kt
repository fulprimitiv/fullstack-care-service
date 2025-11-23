package org.example.backendapp.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.example.backendapp.controller.dto.JwtAuthenticationResponse
import org.example.backendapp.service.AuthenticationService
import org.example.backendapp.service.SignInRequest
import org.example.backendapp.service.command.CreateUserCommand
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/auth")
@Tag(name = "Аутентификация")
class AuthController(
    private val authenticationService: AuthenticationService
) {

    @Operation(summary = "Регистрация пользователя")
    @PostMapping("/sign-up")
    fun signUp(@RequestBody request: @Valid CreateUserCommand): JwtAuthenticationResponse {
        return authenticationService.signUp(request)
    }

    @Operation(summary = "Авторизация пользователя")
    @PostMapping("/sign-in")
    fun signIn(@RequestBody request: @Valid SignInRequest): JwtAuthenticationResponse {
        return authenticationService.signIn(request)
    }
}