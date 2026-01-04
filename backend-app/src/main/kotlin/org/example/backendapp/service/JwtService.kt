package org.example.backendapp.service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.example.backendapp.entity.User
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.*
import javax.crypto.SecretKey

@Service
class JwtService {
    
    @Value("\${token.signing.key}")
    private val jwtSigningKey: String = ""

    /**
     * Извлечение имени пользователя из токена
     *
     * @param token токен
     * @return имя пользователя
     */
    fun extractEmail(token: String): String =
        extractClaim(token) { it.subject }

    /**
     * Генерация токена
     *
     * @param userDetails данные пользователя
     * @return токен
     */
    fun generateToken(userDetails: UserDetails): String {
        val claims = mutableMapOf<String, Any>()
        if (userDetails is User) {
            claims["id"] = userDetails.id
            claims["email"] = userDetails.email
            claims["role"] = userDetails.role.name
        }
        return generateToken(claims, userDetails)
    }

    /**
     * Проверка токена на валидность
     *
     * @param token токен
     * @param userDetails данные пользователя
     * @return true, если токен валиден
     */
    fun isTokenValid(token: String, userDetails: UserDetails): Boolean {
        val userName = extractEmail(token)
        return (userName == userDetails.username) && !isTokenExpired(token)
    }

    /**
     * Извлечение данных из токена
     *
     * @param token токен
     * @param claimsResolver функция извлечения данных
     * @return данные
     */
    private fun <T> extractClaim(token: String, claimsResolver: (Claims) -> T): T {
        val claims = extractAllClaims(token)
        return claimsResolver(claims)
    }

    /**
     * Генерация токена
     *
     * @param extraClaims дополнительные данные
     * @param userDetails данные пользователя
     * @return токен
     */
    private fun generateToken(extraClaims: Map<String, Any>, userDetails: UserDetails): String =
        Jwts.builder()
            .claims(extraClaims)
            .subject(userDetails.username)
            .issuedAt(Date(System.currentTimeMillis()))
            .expiration(Date(System.currentTimeMillis() + 100_000 * 60 * 24))
            .signWith(getSigningKey())
            .compact()

    /**
     * Проверка токена на просроченность
     *
     * @param token токен
     * @return true, если токен просрочен
     */
    private fun isTokenExpired(token: String): Boolean =
        extractExpiration(token).before(Date())

    /**
     * Извлечение даты истечения токена
     *
     * @param token токен
     * @return дата истечения
     */
    private fun extractExpiration(token: String): Date =
        extractClaim(token) { it.expiration }

    /**
     * Извлечение всех данных из токена
     *
     * @param token токен
     * @return данные
     */
    private fun extractAllClaims(token: String): Claims =
        Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .payload

    /**
     * Получение ключа для подписи токена
     *
     * @return ключ
     */
    private fun getSigningKey(): SecretKey {
        val keyBytes = Decoders.BASE64.decode(jwtSigningKey)
        return Keys.hmacShaKeyFor(keyBytes)
    }
}