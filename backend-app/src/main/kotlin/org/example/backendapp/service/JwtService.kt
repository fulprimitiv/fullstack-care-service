package org.example.backendapp.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.example.backendapp.entity.UserRole
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtService {
    @Value("\${jwt.secret}")
    private val secret = "secret"
    private val validity = 3600000 // 1 час

    fun generateToken(username: String, role: UserRole): String {
        return Jwts.builder()
            .setSubject(username)
            .claim("role", role.toString())
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + validity))
            .signWith(SignatureAlgorithm.HS256, secret.toByteArray())
            .compact()
    }

    fun validateToken(token: String): Boolean {
        try {
            Jwts.parser().setSigningKey(secret.toByteArray()).parseClaimsJws(token)
            return true
        } catch (e: Exception) {
            return false
        }
    }

    fun getEmail(token: String): String = Jwts.parser()
        .setSigningKey(secret.toByteArray())
        .parseClaimsJws(token)
        .body
        .subject
}