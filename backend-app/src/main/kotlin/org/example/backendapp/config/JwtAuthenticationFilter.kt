package org.example.backendapp.config


import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.example.backendapp.service.JwtService
import org.example.backendapp.service.UserService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter


@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userService: UserService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // Получаем токен из заголовка
        val authHeader = request.getHeader(HEADER_NAME)
        if (authHeader.isNullOrEmpty() || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response)
            return;
        }

        // Обрезаем префикс и получаем имя пользователя из токена
        val jwt = authHeader.substring(BEARER_PREFIX.length)
        val username = jwtService.extractEmail(jwt)

        if (username.isNotEmpty() && SecurityContextHolder.getContext().authentication == null) {
            val userDetails: UserDetails = userService.findByEmail(username)
            // Если токен валиден, то аутентифицируем пользователя
            if (jwtService.isTokenValid(jwt, userDetails)) {
                val context = SecurityContextHolder.createEmptyContext()

                val authToken = UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.authorities
                )

                authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                context.authentication = authToken
                SecurityContextHolder.setContext(context)
            }
        }
        filterChain.doFilter(request, response)
    }

    companion object {
        const val BEARER_PREFIX: String = "Bearer "
        const val HEADER_NAME: String = "Authorization"
    }
}
