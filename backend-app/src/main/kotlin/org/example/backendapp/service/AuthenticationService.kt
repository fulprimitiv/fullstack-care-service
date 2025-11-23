package org.example.backendapp.service

import org.example.backendapp.controller.dto.JwtAuthenticationResponse
import org.example.backendapp.entity.User
import org.example.backendapp.service.command.CreateUserCommand
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthenticationService(
    private val userService: UserService,
    private val jwtService: JwtService,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager
) {
    /**
     * Регистрация пользователя
     *
     * @param command данные пользователя
     * @return токен
     */
    fun signUp(command: CreateUserCommand): JwtAuthenticationResponse {
        val user = User(
            name = command.name,
            phone = command.phone,
            address = command.address,
            birthday = command.birthDate,
            email = command.email,
            role = command.role,
            password = passwordEncoder.encode(command.password)
        )
        userService.create(user)
        val jwt = jwtService.generateToken(user)
        return JwtAuthenticationResponse(jwt)
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    fun signIn(request: SignInRequest): JwtAuthenticationResponse {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                request.email,
                request.password
            )
        )
        val user = userService.findByEmail(request.email)
        val jwt = jwtService.generateToken(user)

        return JwtAuthenticationResponse(jwt)
    }

}

data class SignInRequest(
    val email: String,
    val password: String
)
