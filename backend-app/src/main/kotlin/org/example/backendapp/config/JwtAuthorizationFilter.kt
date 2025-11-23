//package org.example.backendapp.config
//
//
//import io.jsonwebtoken.Claims
//import io.jsonwebtoken.JwtException
//import jakarta.servlet.FilterChain
//import jakarta.servlet.http.HttpServletRequest
//import jakarta.servlet.http.HttpServletResponse
//import org.example.backendapp.service.JwtService
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
//import org.springframework.security.core.authority.SimpleGrantedAuthority
//import org.springframework.security.core.context.SecurityContextHolder
//import org.springframework.stereotype.Component
//import org.springframework.web.filter.OncePerRequestFilter
//import java.util.*
//
//
//@Component
//class JwtAuthorizationFilter : OncePerRequestFilter() {
//    private val jwtService: JwtService? = null
//
//
//    override fun doFilterInternal(
//        request: HttpServletRequest,
//        response: HttpServletResponse,
//        filterChain: FilterChain
//    ) {
//        var authorizationKey = request.getHeader(HeaderValues.AUTHORIZATION)
//        if (Optional.ofNullable<String?>(authorizationKey)
//                .isPresent && authorizationKey.startsWith(HeaderValues.BEARER)
//        ) {
//            authorizationKey = authorizationKey.replace(HeaderValues.BEARER, "")
//            try {
//                if (jwtService.isValidJwt(Jwt(authorizationKey))) {
//                    val claims: Claims = jwtService.getClaims(authorizationKey)
//                    val username: String? = claims[ClaimField.USERNAME].toString()
//                    val roles = claims.get(ClaimField.ROLE, MutableList::class.java)
//                    val authorities = roles
//                        .map { role: Any? -> SimpleGrantedAuthority(role.toString()) }
//                            .toList()
//                    val authentication: UsernamePasswordAuthenticationToken =
//                        UsernamePasswordAuthentication(username, null, authorities)
//                    SecurityContextHolder.getContext().authentication = authentication
//                }
//            } catch (e: JwtException) {
//                logger.error(e.message)
//                SecurityContextHolder.getContext().authentication = null
//                response.status = HttpServletResponse.SC_NOT_ACCEPTABLE
//            }
//        }
//        filterChain.doFilter(request, response)
//    }
//
//    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
//        return request.servletPath == "/login"
//    }
//}
